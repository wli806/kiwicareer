using System.Threading.Tasks;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Services
{
    public class JobService : IJobService
    {
        public Task<Dictionary<string, List<string>>> GetAllFilters()
        {
            throw new NotImplementedException();
        }

        public Task<(IEnumerable<object> jobs, int total)> GetJobsList(
            int? userId, string keyword, string category, string location,
            List<string> englishFluency, List<string> jobType, List<string> experienceLevel,
            double? minSalary, double? maxSalary, string salaryDuration,
            int page, int limit, string sort)
        {
            throw new NotImplementedException();
        }

        public Task<object?> GetJobById(int jobId, int? userId)
        {
            throw new NotImplementedException();
        }

        public Task AddToWishlist(int userId, int jobId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromWishlist(int userId, int jobId)
        {
            throw new NotImplementedException();
        }

        public Task<(IEnumerable<object> wishlist, int total)> GetWishlistJobs(int userId, int page, int limit, string sort)
        {
            throw new NotImplementedException();
        }

        public Task<(IEnumerable<object> applied, int total)> GetAppliedJobs(int userId, int page, int limit, string sort)
        {
            throw new NotImplementedException();
        }

        public Task ApplyJob(int userId, int jobId, string cvUrl)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<object>> GetRelatedJobs(string category, int limit, int? currentJobId, int? userId)
        {
            throw new NotImplementedException();
        }

        public Task<(IEnumerable<object> companies, int total)> GetCompanies(string search, int page, int limit, string sort, bool hasJobs)
        {
            throw new NotImplementedException();
        }

        public Task<object?> GetCompanyDetails(int companyId)
        {
            throw new NotImplementedException();
        }

        public Task<(IEnumerable<object> jobs, int total)> GetJobsByCompany(int companyId, int page, int limit, string sort, int? userId)
        {
            throw new NotImplementedException();
        }
    }
}
