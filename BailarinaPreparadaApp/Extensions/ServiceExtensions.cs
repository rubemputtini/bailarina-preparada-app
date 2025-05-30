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

namespace BailarinaPreparadaApp.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
            });

            services.AddScoped<AccountService>();
            services.AddScoped<AdminService>();
            services.AddScoped<ActivityLinkService>();
            services.AddScoped<CalendarService>();
            services.AddScoped<EvaluationService>();
            services.AddScoped<ExerciseService>();
            services.AddScoped<ExerciseReferenceService>();
            services.AddScoped<RankingService>();
            services.AddScoped<ScheduleService>();
            services.AddScoped<ScheduleTaskService>();
            services.AddScoped<TrainingService>();
            services.AddScoped<UserService>();
            services.AddScoped<UserGoalService>();
            services.AddScoped<AnnouncementService>();
            services.AddScoped<EmailService>();
            services.AddScoped<AchievementService>();
            services.AddAchievementRules();

            services.AddTransient<TokenService>();

            services.Configure<SmtpConfiguration>(configuration.GetSection("Smtp"));

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddAuthorization();
        }
    }
}
