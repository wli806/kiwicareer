namespace job_api_donet.Services.Interfaces
{
    public interface IMailService
    {
        bool SendConfirmationEmail(string name, string recipient, string subject, string message);

        bool SendWelcomeEmail(string name, string recipient);
    }
}