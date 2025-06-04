using Microsoft.Extensions.DependencyInjection;
using job_api_donet.Services;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Infrastructure
{
    public static class ExtensionServices
    {
        public static void AddProjectServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IOssService, OssService>();
        }
    }
}