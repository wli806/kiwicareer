using Microsoft.AspNetCore.Mvc;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] string username, [FromForm] string email, [FromForm] string password, [FromForm] string role)
        {
            var (result, code) = await _authService.RegisterUser(username, email, password, role);
            return StatusCode(code, result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            var (result, code) = await _authService.LoginUser(email, password);
            return StatusCode(code, result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> Refresh([FromForm] string refresh_token)
        {
            var (result, code) = await _authService.RefreshToken(refresh_token);
            return StatusCode(code, result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromForm] int user_id)
        {
            var (result, code) = await _authService.LogoutUser(user_id);
            return StatusCode(code, result);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromForm] int user_id, [FromForm] string old_password, [FromForm] string new_password)
        {
            var (result, code) = await _authService.ChangePassword(user_id, old_password, new_password);
            return StatusCode(code, result);
        }
    }
}