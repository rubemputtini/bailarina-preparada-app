using System.IO.Compression;
using BailarinaPreparadaApp.Configuration;
using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models.Users;
using BailarinaPreparadaApp.Services;
using BailarinaPreparadaApp.Services.Accounts;
using BailarinaPreparadaApp.Services.ActivityLinks;
using BailarinaPreparadaApp.Services.Admins;
using BailarinaPreparadaApp.Services.Announcements;
using BailarinaPreparadaApp.Services.Calendars;
using BailarinaPreparadaApp.Services.Emails;
using BailarinaPreparadaApp.Services.Evaluations;
using BailarinaPreparadaApp.Services.Exercises;
using BailarinaPreparadaApp.Services.ExerciseReferences;
using BailarinaPreparadaApp.Services.Rankings;
using BailarinaPreparadaApp.Services.Schedules;
using BailarinaPreparadaApp.Services.ScheduleTasks;
using BailarinaPreparadaApp.Services.Trainings;
using BailarinaPreparadaApp.Services.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using BailarinaPreparadaApp.Services.Achievements;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.ResponseCompression;

namespace BailarinaPreparadaApp.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureDbContext(configuration);
            services.ConfigureIdentity();
            services.ConfigureCompression();
            services.ConfigureRateLimiting();
            services.ConfigureCustomServices();
            services.ConfigureExternalServices(configuration);

            services.AddMemoryCache();

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddAuthorization();
        }

        private static void ConfigureDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                    sql => sql.EnableRetryOnFailure().CommandTimeout(180)
                ));
        }

        private static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
            });
        }

        private static void ConfigureCompression(this IServiceCollection services)
        {
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
                options.Providers.Add<BrotliCompressionProvider>();
            });

            services.Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });

            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });
        }

        private static void ConfigureRateLimiting(this IServiceCollection services)
        {
            services.AddRateLimiter(options =>
            {
                options.AddPolicy("LoginLimiter", context =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                        factory: _ => new FixedWindowRateLimiterOptions
                        {
                            PermitLimit = 5,
                            Window = TimeSpan.FromMinutes(1),
                            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                            QueueLimit = 0
                        }));

                options.OnRejected = async (context, token) =>
                {
                    context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    context.HttpContext.Response.ContentType = "application/json";
                    await context.HttpContext.Response.WriteAsync(
                        "{\"message\":\"Muitas requisições. Tente novamente em breve.\"}", token);
                };
            });
        }

        private static void ConfigureCustomServices(this IServiceCollection services)
        {
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IActivityLinkService, ActivityLinkService>();
            services.AddScoped<ICalendarService, CalendarService>();
            services.AddScoped<IEvaluationService, EvaluationService>();
            services.AddScoped<IExerciseService, ExerciseService>();
            services.AddScoped<IExerciseReferenceService, ExerciseReferenceService>();
            services.AddScoped<IRankingService, RankingService>();
            services.AddScoped<IScheduleService, ScheduleService>();
            services.AddScoped<IScheduleTaskService, ScheduleTaskService>();
            services.AddScoped<ITrainingService, TrainingService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserGoalService, UserGoalService>();
            services.AddScoped<IAnnouncementService, AnnouncementService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IAchievementService, AchievementService>();
            services.AddAchievementRules();

            services.AddTransient<ITokenService, TokenService>();
        }

        private static void ConfigureExternalServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.Configure<SmtpConfiguration>(configuration.GetSection("Smtp"));
        }
    }
}