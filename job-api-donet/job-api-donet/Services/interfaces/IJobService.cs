using System.Collections.Generic;
using System.Threading.Tasks;

namespace job_api_donet.Services.Interfaces
{
    public interface IJobService
    {
        Task<Dictionary<string, List<string>>> GetAllFilters();

        Task<(IEnumerable<object> jobs, int total)> GetJobsList(
            int? userId, string keyword, string category, string location,
            List<string> englishFluency, List<string> jobType, List<string> experienceLevel,
            double? minSalary, double? maxSalary, string salaryDuration,
            int page, int limit, string sort);

        Task<object?> GetJobById(int jobId, int? userId);

        Task AddToWishlist(int userId, int jobId);

        Task RemoveFromWishlist(int userId, int jobId);

        Task<(IEnumerable<object> wishlist, int total)> GetWishlistJobs(int userId, int page, int limit, string sort);

        Task<(IEnumerable<object> applied, int total)> GetAppliedJobs(int userId, int page, int limit, string sort);

        Task ApplyJob(int userId, int jobId, string cvUrl);

        Task<IEnumerable<object>> GetRelatedJobs(string category, int limit, int? currentJobId, int? userId);

        Task<(IEnumerable<object> companies, int total)> GetCompanies(string search, int page, int limit, string sort, bool hasJobs);

        Task<object?> GetCompanyDetails(int companyId);

        Task<(IEnumerable<object> jobs, int total)> GetJobsByCompany(int companyId, int page, int limit, string sort, int? userId);
    }
}