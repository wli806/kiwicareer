using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using job_api_donet.Config;

namespace job_api_donet.Database
{
    public class DbManager
    {
        private readonly AppConfig _config;

        public DbManager(IOptions<AppConfig> config)
        {
            _config = config.Value;
        }

        public async Task<MySqlConnection> ConnectAsync()
        {
            var connStr = $"server={_config.Database.Host};user={_config.Database.User};password={_config.Database.Password};database={_config.Database.Name};SslMode=Preferred;charset=utf8mb4;";
            var conn = new MySqlConnection(connStr);
            await conn.OpenAsync();
            return conn;
        }

        public void Close(MySqlConnection conn)
        {
            if (conn?.State == System.Data.ConnectionState.Open)
                conn.Close();
        }
    }
}