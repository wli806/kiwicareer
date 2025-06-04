using job_api_donet.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using job_api_donet.Config;
using Microsoft.Extensions.Options;
using job_api_donet.Database;

namespace job_api_donet.Services
{
    public class AuthService : IAuthService
    {
        private readonly DbManager _db;
        private readonly AppConfig _config;

        public AuthService(DbManager db, IOptions<AppConfig> config)
        {
            _db = db;
            _config = config.Value;
        }

        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
        public bool VerifyPassword(string plainPassword, string hashedPassword) => BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);

        public string GenerateAccessToken(int userId)
        {
            var key = Encoding.ASCII.GetBytes(_config.Jwt.SecretKey);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("sub", userId.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(_config.Jwt.AccessExpireDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public (string token, DateTime expiry) GenerateRefreshToken()
        {
            var token = $"refresh_{Guid.NewGuid()}_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
            var expiry = DateTime.UtcNow.AddDays(_config.Jwt.RefreshExpireDays);
            return (token, expiry);
        }

        public async Task<(object result, int statusCode)> RegisterUser(string username, string email, string password, string role)
        {
            using var conn = await _db.ConnectAsync();
            MySqlTransaction? transaction = null;

            try
            {
                var validRoles = new HashSet<string> { "candidate", "employer", "admin" };
                if (!validRoles.Contains(role))
                    return (new { message = "Invalid role provided." }, 400);

                using var cmd = new MySqlCommand("SELECT COUNT(*) FROM Users WHERE email = @Email", conn);
                cmd.Parameters.AddWithValue("@Email", email);
                var exists = Convert.ToInt32(await cmd.ExecuteScalarAsync()) > 0;
                if (exists)
                    return (new { message = "User already exists." }, 409);

                var hashedPassword = HashPassword(password);
                var (refreshToken, refreshTokenExpiry) = GenerateRefreshToken();
                var initObj = "[]";

                transaction = (MySqlTransaction)await conn.BeginTransactionAsync();

                var insertUserCmd = new MySqlCommand(@"INSERT INTO Users (username, email, bio, social_links, introduction, refresh_token, refresh_token_expiry, roles, educations, experiences, skills, wished_job_categories, wished_job_locations, wished_job_types) VALUES (@Username, @Email, '', @SocialLinks, '', @RefreshToken, @RefreshTokenExpiry, @Roles, @Edu, @Exp, @Skills, @Cat, @Loc, @Types); SELECT LAST_INSERT_ID();", conn, transaction);

                insertUserCmd.Parameters.AddWithValue("@Username", username);
                insertUserCmd.Parameters.AddWithValue("@Email", email);
                insertUserCmd.Parameters.AddWithValue("@SocialLinks", initObj);
                insertUserCmd.Parameters.AddWithValue("@RefreshToken", refreshToken);
                insertUserCmd.Parameters.AddWithValue("@RefreshTokenExpiry", refreshTokenExpiry);
                insertUserCmd.Parameters.AddWithValue("@Roles", role);
                insertUserCmd.Parameters.AddWithValue("@Edu", initObj);
                insertUserCmd.Parameters.AddWithValue("@Exp", initObj);
                insertUserCmd.Parameters.AddWithValue("@Skills", initObj);
                insertUserCmd.Parameters.AddWithValue("@Cat", initObj);
                insertUserCmd.Parameters.AddWithValue("@Loc", initObj);
                insertUserCmd.Parameters.AddWithValue("@Types", initObj);

                var userId = Convert.ToInt32(await insertUserCmd.ExecuteScalarAsync());

                var insertPwdCmd = new MySqlCommand("INSERT INTO UserPasswords (user_id, password_hash) VALUES (@UserId, @Hash)", conn, transaction);
                insertPwdCmd.Parameters.AddWithValue("@UserId", userId);
                insertPwdCmd.Parameters.AddWithValue("@Hash", hashedPassword);
                await insertPwdCmd.ExecuteNonQueryAsync();

                await transaction.CommitAsync();
                return (new { id = userId, username, email, role }, 201);
            }
            catch (Exception ex)
            {
                await transaction?.RollbackAsync()!;
                return (new { message = $"Error registering user: {ex.Message}" }, 500);
            }
        }

        public async Task<(object result, int statusCode)> LoginUser(string email, string password)
        {
            using var conn = await _db.ConnectAsync();
            try
            {
                using var cmd = new MySqlCommand(@"SELECT u.id, u.username, u.email, u.roles, p.password_hash FROM Users u JOIN UserPasswords p ON u.id = p.user_id WHERE u.email = @Email", conn);
                cmd.Parameters.AddWithValue("@Email", email);
                using var reader = await cmd.ExecuteReaderAsync();

                if (!await reader.ReadAsync()) return (new { message = "User not found." }, 404);

                var hash = reader["password_hash"].ToString();
                if (!VerifyPassword(password, hash)) return (new { message = "Incorrect password." }, 401);

                var userId = Convert.ToInt32(reader["id"]);
                var username = reader["username"].ToString();
                var role = reader["roles"].ToString();
                var access = GenerateAccessToken(userId);
                var (refresh, expiry) = GenerateRefreshToken();

                await reader.CloseAsync();

                using var updateCmd = new MySqlCommand("UPDATE Users SET refresh_token = @Refresh, refresh_token_expiry = @Expiry WHERE id = @UserId", conn);
                updateCmd.Parameters.AddWithValue("@Refresh", refresh);
                updateCmd.Parameters.AddWithValue("@Expiry", expiry);
                updateCmd.Parameters.AddWithValue("@UserId", userId);
                await updateCmd.ExecuteNonQueryAsync();

                return (new { id = userId, username, email, role, access_token = access, refresh_token = refresh }, 200);
            }
            catch (Exception ex)
            {
                return (new { message = $"Login error: {ex.Message}" }, 500);
            }
        }

        public async Task<(object result, int statusCode)> RefreshToken(string refreshToken)
        {
            using var conn = await _db.ConnectAsync();
            try
            {
                using var cmd = new MySqlCommand("SELECT id, refresh_token_expiry FROM Users WHERE refresh_token = @Token", conn);
                cmd.Parameters.AddWithValue("@Token", refreshToken);
                using var reader = await cmd.ExecuteReaderAsync();

                if (!await reader.ReadAsync()) return (new { message = "Invalid refresh token." }, 401);

                var userId = Convert.ToInt32(reader["id"]);
                var expiry = Convert.ToDateTime(reader["refresh_token_expiry"]);
                if (expiry < DateTime.UtcNow) return (new { message = "Token expired." }, 403);

                var accessToken = GenerateAccessToken(userId);
                return (new { access_token = accessToken }, 200);
            }
            catch (Exception ex)
            {
                return (new { message = $"Refresh error: {ex.Message}" }, 500);
            }
        }

        public async Task<(object result, int statusCode)> LogoutUser(int userId)
        {
            using var conn = await _db.ConnectAsync();
            try
            {
                using var cmd = new MySqlCommand("UPDATE Users SET refresh_token = NULL, refresh_token_expiry = NULL WHERE id = @UserId", conn);
                cmd.Parameters.AddWithValue("@UserId", userId);
                await cmd.ExecuteNonQueryAsync();
                return (new { message = "Logged out successfully." }, 200);
            }
            catch (Exception ex)
            {
                return (new { message = $"Logout error: {ex.Message}" }, 500);
            }
        }

        public async Task<(object result, int statusCode)> ChangePassword(int userId, string oldPassword, string newPassword)
        {
            using var conn = await _db.ConnectAsync();
            try
            {
                using var cmd = new MySqlCommand("SELECT password_hash FROM UserPasswords WHERE user_id = @UserId", conn);
                cmd.Parameters.AddWithValue("@UserId", userId);
                var hash = (string?)await cmd.ExecuteScalarAsync();

                if (hash == null || !VerifyPassword(oldPassword, hash))
                    return (new { message = "Old password incorrect." }, 401);

                var newHash = HashPassword(newPassword);
                using var updateCmd = new MySqlCommand("UPDATE UserPasswords SET password_hash = @Hash WHERE user_id = @UserId", conn);
                updateCmd.Parameters.AddWithValue("@UserId", userId);
                updateCmd.Parameters.AddWithValue("@Hash", newHash);
                await updateCmd.ExecuteNonQueryAsync();

                return (new { message = "Password changed." }, 200);
            }
            catch (Exception ex)
            {
                return (new { message = $"Change password error: {ex.Message}" }, 500);
            }
        }
    }
}
