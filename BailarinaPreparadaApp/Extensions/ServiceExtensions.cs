using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

            services.AddScoped<AccountService>();
            services.AddScoped<AdminService>();
            services.AddScoped<CalendarService>();
            services.AddScoped<EvaluationService>();
            services.AddScoped<ExerciseService>();
            services.AddScoped<RankingService>();
            services.AddScoped<ScheduleService>();
            services.AddScoped<ScheduleTaskService>();
            services.AddScoped<TrainingService>();
            services.AddScoped<UserService>();
            services.AddScoped<UserGoalService>();

            services.AddTransient<TokenService>();

            //services.Configure<SmtpConfiguration>(configuration.GetSection("Smtp"));

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddAuthorization();
        }
    }
}
