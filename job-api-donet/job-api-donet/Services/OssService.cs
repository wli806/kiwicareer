using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Services
{
    public class OssService : IOssService
    {
        private readonly string _basePath = "wwwroot/oss";

        public string UploadAvatar(IFormFile file, string filename)
        {
            try
            {
                var ext = Path.GetExtension(file.FileName);
                var fullName = $"{filename}{ext}";
                var savePath = Path.Combine(_basePath, "avatars", fullName);
                Directory.CreateDirectory(Path.GetDirectoryName(savePath)!);

                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return $"/oss/avatars/{fullName}";
            }
            catch (Exception ex)
            {
                throw new IOException($"Failed to upload avatar: {ex.Message}");
            }
        }

        public (string ossPath, string originalFilename) UploadResume(IFormFile file, string filename, int userId)
        {
            try
            {
                var ext = Path.GetExtension(file.FileName);
                var fullName = $"{filename}{ext}";
                var savePath = Path.Combine(_basePath, "resumes", fullName);
                Directory.CreateDirectory(Path.GetDirectoryName(savePath)!);

                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var ossPath = $"/oss/resumes/{fullName}";
                var originalFilename = Path.GetFileName(file.FileName);
                return (ossPath, originalFilename);
            }
            catch (Exception ex)
            {
                throw new IOException($"Failed to upload resume: {ex.Message}");
            }
        }

        public string CopyJobResume(string sourceUrl, string originalFilename, int jobId)
        {
            try
            {
                var destName = $"job_{jobId}_{DateTime.Now.Ticks}_{originalFilename}";
                var destPath = Path.Combine(_basePath, "job_resumes", destName);
                Directory.CreateDirectory(Path.GetDirectoryName(destPath)!);

                var localSource = sourceUrl.StartsWith("/oss/")
                    ? Path.Combine(_basePath, sourceUrl.Replace("/oss/", ""))
                    : sourceUrl;

                File.Copy(localSource, destPath);
                return $"/oss/job_resumes/{destName}";
            }
            catch (Exception ex)
            {
                throw new IOException($"Failed to copy resume: {ex.Message}");
            }
        }

        public void DeleteFile(string fileUrl)
        {
            try
            {
                if (string.IsNullOrEmpty(fileUrl) || !fileUrl.StartsWith("/oss/")) return;
                var localPath = Path.Combine(_basePath, fileUrl.Replace("/oss/", ""));
                if (File.Exists(localPath))
                {
                    File.Delete(localPath);
                }
            }
            catch (Exception ex)
            {
                throw new IOException($"Failed to delete file: {ex.Message}");
            }
        }
    }
}
