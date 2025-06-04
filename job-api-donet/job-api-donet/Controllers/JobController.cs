using Microsoft.AspNetCore.Mvc;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Controllers
{
    [ApiController]
    [Route("jobs")]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchJobs([FromQuery] string? keyword, [FromQuery] string? category,
                                                    [FromQuery] string? location, [FromQuery] string? english_fluency,
                                                    [FromQuery] string? job_type, [FromQuery] string? experience,
                                                    [FromQuery] double? min_salary, [FromQuery] double? max_salary,
                                                    [FromQuery] string? salary_duration, [FromQuery] int page = 1,
                                                    [FromQuery] int limit = 8, [FromQuery] string? sort = null,
                                                    [FromQuery] int? user_id = null)
        {
            var fluency_levels = new List<string> { "Basic", "Conversational", "Fluent", "Native/Bilingual" };
            var parsedFluency = new List<string>();
            if (!string.IsNullOrEmpty(english_fluency) && fluency_levels.Contains(english_fluency))
            {
                int maxIndex = fluency_levels.IndexOf(english_fluency);
                parsedFluency = fluency_levels.Take(maxIndex + 1).ToList();
            }

            var jobs = await _jobService.GetJobsList(user_id, keyword, category, location,
                                                     parsedFluency,
                                                     job_type?.Split(',').ToList() ?? new List<string>(),
                                                     experience?.Split(',').ToList() ?? new List<string>(),
                                                     min_salary, max_salary, salary_duration, page, limit, sort ?? "");

            return Ok(new
            {
                jobs = jobs.jobs,
                total_count = jobs.total,
                page,
                limit,
                total_pages = (jobs.total + limit - 1) / limit
            });
        }

        [HttpGet("{jobId:int}")]
        public async Task<IActionResult> GetJobDetails([FromRoute] int jobId, [FromQuery] int? user_id = null)
        {
            var job = await _jobService.GetJobById(jobId, user_id);
            if (job == null) return NotFound(new { message = "Job not found" });
            return Ok(job);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var filters = await _jobService.GetAllFilters();
            return Ok(filters);
        }

        [HttpPost("wishlist/{jobId:int}")]
        public async Task<IActionResult> AddToWishlist([FromRoute] int jobId, [FromQuery] int user_id)
        {
            await _jobService.AddToWishlist(user_id, jobId);
            return StatusCode(201, new { message = "Job added to wishlist" });
        }

        [HttpDelete("wishlist/{jobId:int}")]
        public async Task<IActionResult> RemoveFromWishlist([FromRoute] int jobId, [FromQuery] int user_id)
        {
            await _jobService.RemoveFromWishlist(user_id, jobId);
            return Ok(new { message = "Job removed from wishlist" });
        }

        [HttpGet("wishlist")]
        public async Task<IActionResult> GetWishlist([FromQuery] int user_id, [FromQuery] int page = 1, [FromQuery] int limit = 4, [FromQuery] string sort = "New")
        {
            var result = await _jobService.GetWishlistJobs(user_id, page, limit, sort);
            return Ok(new
            {
                wishlist = result.wishlist,
                total_count = result.total,
                page,
                limit,
                total_pages = (result.total + limit - 1) / limit
            });
        }

        [HttpGet("applied-jobs")]
        public async Task<IActionResult> GetAppliedJobs([FromQuery] int user_id, [FromQuery] int page = 1, [FromQuery] int limit = 4, [FromQuery] string sort = "New")
        {
            var result = await _jobService.GetAppliedJobs(user_id, page, limit, sort);
            return Ok(new
            {
                applied_jobs = result.applied,
                total_count = result.total,
                page,
                limit,
                total_pages = (result.total + limit - 1) / limit
            });
        }

        [HttpPost("apply/{jobId:int}")]
        public async Task<IActionResult> ApplyJob([FromRoute] int jobId, [FromQuery] int user_id, [FromBody] dynamic body)
        {
            string cv_url = body.cv_url;
            if (string.IsNullOrEmpty(cv_url)) return BadRequest(new { message = "cv is required." });

            await _jobService.ApplyJob(user_id, jobId, cv_url);
            return StatusCode(201, new { message = "Job application submitted successfully" });
        }

        [HttpGet("related")]
        public async Task<IActionResult> GetRelatedJobs([FromQuery] string category, [FromQuery] int limit = 8, [FromQuery] int? current_job_id = null, [FromQuery] int? user_id = null)
        {
            var related = await _jobService.GetRelatedJobs(category, limit, current_job_id, user_id);
            return Ok(new
            {
                related_jobs = related,
                total_count = related.Count()
            });
        }

        [HttpGet("companies")]
        public async Task<IActionResult> GetCompanies([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 20, [FromQuery] string sort = "job_count", [FromQuery] bool has_jobs = true)
        {
            var result = await _jobService.GetCompanies(search ?? "", page, limit, sort, has_jobs);
            return Ok(new
            {
                companies = result.companies,
                total_count = result.total,
                page,
                limit,
                total_pages = (result.total + limit - 1) / limit
            });
        }

        [HttpGet("company/{companyId:int}")]
        public async Task<IActionResult> GetCompanyDetails([FromRoute] int companyId)
        {
            var result = await _jobService.GetCompanyDetails(companyId);
            if (result == null) return NotFound(new { message = "Company not found" });
            return Ok(result);
        }

        [HttpGet("company/{companyId:int}/jobs")]
        public async Task<IActionResult> GetCompanyJobs([FromRoute] int companyId, [FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string sort = "date", [FromQuery] int? user_id = null)
        {
            var result = await _jobService.GetJobsByCompany(companyId, page, limit, sort, user_id);
            return Ok(new
            {
                jobs = result.jobs,
                total_count = result.total,
                page,
                limit,
                total_pages = (result.total + limit - 1) / limit
            });
        }
    }
}
