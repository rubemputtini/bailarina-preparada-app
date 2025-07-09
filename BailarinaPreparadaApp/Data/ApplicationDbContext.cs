using BailarinaPreparadaApp.Models.ActivityLinks;
using BailarinaPreparadaApp.Models.Addresses;
using BailarinaPreparadaApp.Models.Announcements;
using BailarinaPreparadaApp.Models.Evaluations;
using BailarinaPreparadaApp.Models.Exercises;
using BailarinaPreparadaApp.Models.ExerciseReferences;
using BailarinaPreparadaApp.Models.Schedules;
using BailarinaPreparadaApp.Models.ScheduleTasks;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Models.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BailarinaPreparadaApp.Models.Achievements;

namespace BailarinaPreparadaApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<ActivityLink> ActivityLinks { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<EvaluationExercise> EvaluationExercises { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<ExerciseReference> ExerciseReferences { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<TrainingFeedback> TrainingFeedbacks { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<ScheduleTask> ScheduleTasks { get; set; }
        public DbSet<UserGoal> UserGoals { get; set; }
        public DbSet<UserAchievement> UserAchievements { get; set; }
        public DbSet<AchievementDefinition> AchievementDefinitions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
    }
}
