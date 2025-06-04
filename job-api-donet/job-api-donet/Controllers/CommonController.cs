using Microsoft.AspNetCore.Mvc;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Controllers
{
    [ApiController]
    [Route("common")]
    public class CommonController : ControllerBase
    {
        private readonly IMailService _mailService;

        public CommonController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("contact")]
        public IActionResult Contact([FromBody] ContactFormDto form)
        {
            if (string.IsNullOrWhiteSpace(form.Name) ||
                string.IsNullOrWhiteSpace(form.Email) ||
                string.IsNullOrWhiteSpace(form.Message))
            {
                return BadRequest(new { message = "Missing required fields" });
            }

            var subject = string.IsNullOrWhiteSpace(form.Subject) ? "Message Received" : form.Subject;

            var success = _mailService.SendConfirmationEmail(form.Name.Trim(), form.Email.Trim(), subject.Trim(), form.Message.Trim());

            if (success)
            {
                return Ok(new { message = "Your message has been received. A confirmation email has been sent." });
            }
            else
            {
                return StatusCode(500, new { message = "Your message has been received, but failed to send confirmation email." });
            }
        }
    }

    public class ContactFormDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}