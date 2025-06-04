using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using job_api_donet.Services.Interfaces;

namespace job_api_donet.Services
{
    public class MailService : IMailService
    {
        private readonly IConfiguration _config;
        private readonly string _templatePath;

        public MailService(IConfiguration config)
        {
            _config = config;
            _templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates");
        }

        public bool SendConfirmationEmail(string name, string recipient, string subject, string message)
        {
            if (string.IsNullOrWhiteSpace(subject)) subject = "Message Received";

            string emailSubject = $"Confirmation: {subject}";
            string company = _config["Company:Name"] ?? "Our Company";
            string headerImg = _config["Mail:HeaderImage"] ?? "";
            string footerImg = _config["Mail:FooterImage"] ?? "";

            string templatePath = Path.Combine(_templatePath, "confirmation_email_template.html");
            string htmlBody = File.Exists(templatePath)
                ? File.ReadAllText(templatePath)
                    .Replace("{{ name }}", name)
                    .Replace("{{ message }}", message)
                    .Replace("{{ company_name }}", company)
                    .Replace("{{ header_image }}", headerImg)
                    .Replace("{{ footer_image }}", footerImg)
                : $"<p>Hello {name},</p><p>{message}</p>";

            string textBody = $"Dear {name},\n\nThank you for contacting us. We received your message:\n{message}\n\nBest regards,\n{company} Team";

            return SendEmail(emailSubject, recipient, textBody, htmlBody);
        }

        public bool SendWelcomeEmail(string name, string recipient)
        {
            string subject = $"Welcome to {_config["Company:Name"]}";
            string company = _config["Company:Name"] ?? "Our Company";
            string frontUrl = _config["Mail:FrontUrl"] ?? "https://example.com";
            string headerImg = _config["Mail:HeaderImage"] ?? "";
            string footerImg = _config["Mail:FooterImage"] ?? "";

            string templatePath = Path.Combine(_templatePath, "welcome_email_template.html");
            string htmlBody = File.Exists(templatePath)
                ? File.ReadAllText(templatePath)
                    .Replace("{{ name }}", name)
                    .Replace("{{ company_name }}", company)
                    .Replace("{{ front_url }}", frontUrl)
                    .Replace("{{ header_image }}", headerImg)
                    .Replace("{{ footer_image }}", footerImg)
                : $"<p>Hello {name}, welcome!</p>";

            string textBody = $"Dear {name},\n\nWelcome to {company}!\n\nWe are thrilled to have you on board.\n\nBest regards,\n{company} Team";

            return SendEmail(subject, recipient, textBody, htmlBody);
        }

        private bool SendEmail(string subject, string recipient, string body, string html)
        {
            try
            {
                var smtpClient = new SmtpClient(_config["Mail:SmtpHost"])
                {
                    Port = int.Parse(_config["Mail:SmtpPort"]),
                    Credentials = new NetworkCredential(_config["Mail:Username"], _config["Mail:Password"]),
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_config["Mail:Sender"] ?? "no-reply@example.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };

                mailMessage.To.Add(recipient);

                if (!string.IsNullOrEmpty(html))
                {
                    var htmlView = AlternateView.CreateAlternateViewFromString(html, null, "text/html");
                    mailMessage.AlternateViews.Add(htmlView);
                    mailMessage.IsBodyHtml = true;
                }

                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return false;
            }
        }
    }
}
