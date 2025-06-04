using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OssController : ControllerBase
    {
        private readonly IOssService _ossService;

        public OssController(IOssService ossService)
        {
            _ossService = ossService;
        }

        [HttpPost("upload-avatar")]
        [Consumes("multipart/form-data")]
        public IActionResult UploadAvatar(
            [FromForm] IFormFile file,
            [FromForm] string filename)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "No file provided." });

            try
            {
                var path = _ossService.UploadAvatar(file, filename);
                return Ok(new { path });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("upload-resume")]
        [Consumes("multipart/form-data")]
        public IActionResult UploadResume(
            [FromForm] IFormFile file,
            [FromForm] string filename,
            [FromForm] int userId)
        {
            try
            {
                var (path, original) = _ossService.UploadResume(file, filename, userId);
                return Ok(new { path, original });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("copy-resume")]
        public IActionResult CopyResume(string sourceUrl, string filename, int jobId)
        {
            try
            {
                var newPath = _ossService.CopyJobResume(sourceUrl, filename, jobId);
                return Ok(new { path = newPath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        
        [HttpDelete("delete")]
        public IActionResult DeleteFile([FromQuery] string fileUrl)
        {
            try
            {
                _ossService.DeleteFile(fileUrl);
                return Ok(new { message = "File deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
