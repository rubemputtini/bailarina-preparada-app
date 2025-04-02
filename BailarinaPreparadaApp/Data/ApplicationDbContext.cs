using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<EvaluationExercise> EvaluationExercises { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<ExerciseReference> ExerciseReferences { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<ClassEvent> ClassEvents { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<ScheduleTask> ScheduleTasks { get; set; }
        public DbSet<UserGoal> UserGoals { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(u => u.Address)
                .WithOne(a => a.User)
                .HasForeignKey<Address>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Evaluation>()
                .HasOne(e => e.Admin)
                .WithMany()
                .HasForeignKey(e => e.AdminId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Evaluation>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Evaluation>()
                .HasMany(e => e.Exercises)
                .WithOne(ee => ee.Evaluation)
                .HasForeignKey(ee => ee.EvaluationId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Schedule>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
