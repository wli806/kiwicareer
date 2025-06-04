using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace job_api_donet.Services.Interfaces
{
    public interface IOssService
    {
        string UploadAvatar(IFormFile file, string filename);

        (string ossPath, string originalFilename) UploadResume(IFormFile file, string filename, int userId);

        string CopyJobResume(string sourceUrl, string originalFilename, int jobId);

        void DeleteFile(string fileUrl);
    }
}