// Program.cs - 最终集成配置、服务注册、中间件和控制器映射
using job_api_donet.Config;
using job_api_donet.Infrastructure;
using job_api_donet.Database;
using job_api_donet.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 添加控制器支持
builder.Services.AddControllers();

// 注册配置绑定
builder.Services.Configure<AppConfig>(builder.Configuration.GetSection("AppConfig"));

// 注册自定义服务（统一扩展注册）
builder.Services.AddProjectServices();
builder.Services.AddScoped<DbManager>();

// Swagger 支持
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Job API",
        Version = "v1"
    });
});

// 允许跨域（前后端联调）
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// 启用 Swagger
app.UseSwagger();
app.UseSwaggerUI();

// 启用 CORS
app.UseCors("AllowAll");

// 启用 JWT 中间件（认证）
app.UseJwtAuth();

// 启用静态文件路径，如 /oss/**
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "oss")),
    RequestPath = "/oss"
});

app.UseAuthorization();

// 控制器映射
app.MapControllers();

app.Run();
