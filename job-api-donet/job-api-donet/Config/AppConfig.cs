namespace job_api_donet.Config
{
    public class AppConfig
    {
        public string FrontUrl { get; set; }
        public string CompanyName { get; set; }

        public JwtSettings Jwt { get; set; }
        public OssSettings Oss { get; set; }
        public DatabaseSettings Database { get; set; }
        public MailSettings Mail { get; set; }

        public class JwtSettings
        {
            public string SecretKey { get; set; }
            public int AccessExpireDays { get; set; }
            public int RefreshExpireDays { get; set; }
            public int RenewThresholdDays { get; set; }
        }

        public class OssSettings
        {
            public string AccessKey { get; set; }
            public string Secret { get; set; }
            public string Endpoint { get; set; }
            public string Bucket { get; set; }
            public string CdnUrl { get; set; }
        }

        public class DatabaseSettings
        {
            public string Host { get; set; }
            public string User { get; set; }
            public string Password { get; set; }
            public string Name { get; set; }
        }

        public class MailSettings
        {
            public string Host { get; set; }
            public int Port { get; set; }
            public bool UseSSL { get; set; }
            public string User { get; set; }
            public string Password { get; set; }
            public string Sender { get; set; }
            public string HeaderImage { get; set; }
            public string FooterImage { get; set; }
        }
    }
}