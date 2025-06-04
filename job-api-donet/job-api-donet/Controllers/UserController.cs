using Microsoft.AspNetCore.Mvc;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-user-profile")]
        public async Task<IActionResult> GetProfile([FromQuery] int userId)
        {
            var result = await _userService.GetUserProfile(userId);
            if (result == null) return NotFound(new { message = "User not found" });
            return Ok(result);
        }

        [HttpPost("update-user-profile")]
        public async Task<IActionResult> UpdateProfile([FromQuery] int userId, [FromBody] dynamic body)
        {
            await _userService.UpdateUserProfile(userId, body.avatar_url, body.fullName, body.bio,
                                                  body.socialLinks.ToObject<List<string>>(),
                                                  body.isRecommandRequired,
                                                  body.wishedJobCategories.ToObject<List<string>>(),
                                                  body.wishedJobLocations.ToObject<List<string>>(),
                                                  body.wishedJobTypes.ToObject<List<string>>());
            return Ok(new { message = "Profile updated successfully" });
        }

        [HttpGet("get-resumes")]
        public async Task<IActionResult> GetResumes([FromQuery] int userId)
        {
            var result = await _userService.GetUserResumes(userId);
            return Ok(result);
        }

        [HttpGet("get-user-resume")]
        public async Task<IActionResult> GetResumeDetails([FromQuery] int userId)
        {
            var result = await _userService.GetUserResumeDetails(userId);
            if (result == null) return NotFound(new { message = "User resume not found" });
            return Ok(result);
        }

        [HttpPost("update-user-resume")]
        public async Task<IActionResult> UpdateResume([FromQuery] int userId, [FromBody] dynamic body)
        {
            await _userService.UpdateUserResumeDetails(userId, body.introduction,
                                                       body.educations.ToObject<List<object>>(),
                                                       body.experiences.ToObject<List<object>>(),
                                                       body.skills.ToObject<List<object>>());
            return Ok(new { message = "Resume updated successfully" });
        }

        [HttpGet("get-account-settings")]
        public async Task<IActionResult> GetAccountSettings([FromQuery] int userId)
        {
            var result = await _userService.GetUserAccountSettings(userId);
            if (result == null) return NotFound(new { message = "User not found" });
            return Ok(result);
        }

        [HttpPost("update-account-settings")]
        public async Task<IActionResult> UpdateAccountSettings([FromQuery] int userId, [FromBody] dynamic body)
        {
            await _userService.UpdateUserAccountSettings(userId, body.firstName.ToString(),
                                                         body.lastName.ToString(),
                                                         body.email.ToString(),
                                                         body.phone.ToString());
            return Ok(new { message = "Account settings updated successfully!" });
        }
    }
}
