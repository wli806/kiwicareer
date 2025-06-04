using System.Threading.Tasks;

namespace job_api_donet.Services.Interfaces
{
    public interface IUserService
    {
        Task<object?> GetUserProfile(int userId);
        Task UpdateUserProfile(int userId, string? avatarUrl, string? fullName, string? bio,
            List<string>? socialLinks, bool isRecommandRequired,
            List<string>? wishedCategories, List<string>? wishedLocations, List<string>? wishedTypes);

        Task<object?> GetUserResumes(int userId);
        Task<object?> SaveResumeRecord(int userId, string resumeUrl, string originalFilename);
        Task DeleteResumeRecord(int userId, string resumeUrl);

        Task<object?> GetUserResumeDetails(int userId);
        Task UpdateUserResumeDetails(int userId, string introduction, List<object> educations,
            List<object> experiences, List<object> skills);

        Task<object?> GetUserAccountSettings(int userId);
        Task UpdateUserAccountSettings(int userId, string firstName, string lastName, string email, string phone);
    }
}