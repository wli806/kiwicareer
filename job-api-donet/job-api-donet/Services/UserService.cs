using job_api_donet.Services.Interfaces;
using MySql.Data.MySqlClient;
using System.Text.Json;
using job_api_donet.Database;

namespace job_api_donet.Services
{
    public class UserService : IUserService
    {
        private readonly DbManager _db;

        public UserService(DbManager db)
        {
            _db = db;
        }

        public async Task<object?> GetUserProfile(int userId)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand(@"SELECT avatar_url, username, bio, social_links, is_recommand_required,
                                         wished_job_categories, wished_job_locations, wished_job_types FROM Users WHERE id = @UserId", conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            using var reader = await cmd.ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;
            return new
            {
                avatar_url = reader["avatar_url"],
                fullName = reader["username"],
                bio = reader["bio"]?.ToString() ?? "",
                socialLinks = JsonSerializer.Deserialize<List<string>>(reader["social_links"].ToString() ?? "[]"),
                isRecommandRequired = Convert.ToBoolean(reader["is_recommand_required"]),
                wishedJobCategories = JsonSerializer.Deserialize<List<string>>(reader["wished_job_categories"].ToString() ?? "[]"),
                wishedJobLocations = JsonSerializer.Deserialize<List<string>>(reader["wished_job_locations"].ToString() ?? "[]"),
                wishedJobTypes = JsonSerializer.Deserialize<List<string>>(reader["wished_job_types"].ToString() ?? "[]")
            };
        }

        public async Task UpdateUserProfile(int userId, string? avatarUrl, string? fullName, string? bio,
            List<string>? socialLinks, bool isRecommandRequired, List<string>? wishedCategories,
            List<string>? wishedLocations, List<string>? wishedTypes)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand(@"UPDATE Users SET avatar_url=@Avatar, username=@Name, bio=@Bio, social_links=@Links,
                                         is_recommand_required=@Req, wished_job_categories=@Cat, wished_job_locations=@Loc, wished_job_types=@Types
                                         WHERE id=@UserId", conn);
            cmd.Parameters.AddWithValue("@Avatar", avatarUrl);
            cmd.Parameters.AddWithValue("@Name", fullName);
            cmd.Parameters.AddWithValue("@Bio", bio);
            cmd.Parameters.AddWithValue("@Links", JsonSerializer.Serialize(socialLinks));
            cmd.Parameters.AddWithValue("@Req", isRecommandRequired);
            cmd.Parameters.AddWithValue("@Cat", JsonSerializer.Serialize(wishedCategories));
            cmd.Parameters.AddWithValue("@Loc", JsonSerializer.Serialize(wishedLocations));
            cmd.Parameters.AddWithValue("@Types", JsonSerializer.Serialize(wishedTypes));
            cmd.Parameters.AddWithValue("@UserId", userId);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<object?> GetUserResumes(int userId)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand("SELECT id, resume_url, original_filename, uploaded_at FROM UserResumes WHERE user_id=@UserId ORDER BY uploaded_at DESC", conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            using var reader = await cmd.ExecuteReaderAsync();
            var list = new List<object>();
            while (await reader.ReadAsync())
            {
                list.Add(new
                {
                    id = reader["id"],
                    resume_url = reader["resume_url"],
                    original_filename = reader["original_filename"],
                    uploaded_at = reader["uploaded_at"]
                });
            }
            return list;
        }

        public async Task<object?> SaveResumeRecord(int userId, string resumeUrl, string originalFilename)
        {
            using var conn = await _db.ConnectAsync();
            var insertCmd = new MySqlCommand("INSERT INTO UserResumes (user_id, resume_url, original_filename, uploaded_at) VALUES (@UserId, @Url, @File, NOW())", conn);
            insertCmd.Parameters.AddWithValue("@UserId", userId);
            insertCmd.Parameters.AddWithValue("@Url", resumeUrl);
            insertCmd.Parameters.AddWithValue("@File", originalFilename);
            await insertCmd.ExecuteNonQueryAsync();
            var resumeId = (int)insertCmd.LastInsertedId;

            var selectCmd = new MySqlCommand("SELECT uploaded_at FROM UserResumes WHERE id = @Id", conn);
            selectCmd.Parameters.AddWithValue("@Id", resumeId);
            var uploadedAt = await selectCmd.ExecuteScalarAsync();

            return new { id = resumeId, resume_url = resumeUrl, original_filename = originalFilename, uploaded_at = uploadedAt };
        }

        public async Task DeleteResumeRecord(int userId, string resumeUrl)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand("DELETE FROM UserResumes WHERE user_id = @UserId AND resume_url = @Url", conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            cmd.Parameters.AddWithValue("@Url", resumeUrl);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<object?> GetUserResumeDetails(int userId)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand("SELECT introduction, educations, experiences, skills FROM Users WHERE id=@UserId", conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            using var reader = await cmd.ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;
            return new
            {
                introduction = reader["introduction"]?.ToString() ?? "",
                educations = JsonSerializer.Deserialize<List<object>>(reader["educations"].ToString() ?? "[]"),
                experiences = JsonSerializer.Deserialize<List<object>>(reader["experiences"].ToString() ?? "[]"),
                skills = JsonSerializer.Deserialize<List<object>>(reader["skills"].ToString() ?? "[]")
            };
        }

        public async Task UpdateUserResumeDetails(int userId, string introduction, List<object> educations, List<object> experiences, List<object> skills)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand("UPDATE Users SET introduction=@Intro, educations=@Edu, experiences=@Exp, skills=@Skills WHERE id=@UserId", conn);
            cmd.Parameters.AddWithValue("@Intro", introduction);
            cmd.Parameters.AddWithValue("@Edu", JsonSerializer.Serialize(educations));
            cmd.Parameters.AddWithValue("@Exp", JsonSerializer.Serialize(experiences));
            cmd.Parameters.AddWithValue("@Skills", JsonSerializer.Serialize(skills));
            cmd.Parameters.AddWithValue("@UserId", userId);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<object?> GetUserAccountSettings(int userId)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand("SELECT firstname, lastname, email, phone_number FROM Users WHERE id=@UserId", conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            using var reader = await cmd.ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;
            return new
            {
                firstName = reader["firstname"],
                lastName = reader["lastname"],
                email = reader["email"],
                phone = reader["phone_number"]
            };
        }

        public async Task UpdateUserAccountSettings(int userId, string firstName, string lastName, string email, string phone)
        {
            using var conn = await _db.ConnectAsync();
            var cmd = new MySqlCommand("UPDATE Users SET firstname=@First, lastname=@Last, email=@Email, phone_number=@Phone WHERE id=@UserId", conn);
            cmd.Parameters.AddWithValue("@First", firstName);
            cmd.Parameters.AddWithValue("@Last", lastName);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@Phone", phone);
            cmd.Parameters.AddWithValue("@UserId", userId);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
