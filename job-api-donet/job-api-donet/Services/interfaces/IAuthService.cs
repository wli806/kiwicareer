using System.Threading.Tasks;

namespace job_api_donet.Services.Interfaces
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string plainPassword, string hashedPassword);
        string GenerateAccessToken(int userId);
        (string token, DateTime expiry) GenerateRefreshToken();

        Task<(object result, int statusCode)> RegisterUser(string username, string email, string password, string role);
        Task<(object result, int statusCode)> LoginUser(string email, string password);
        Task<(object result, int statusCode)> RefreshToken(string refreshToken);
        Task<(object result, int statusCode)> LogoutUser(int userId);
        Task<(object result, int statusCode)> ChangePassword(int userId, string oldPassword, string newPassword);
    }
}