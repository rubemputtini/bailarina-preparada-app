using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<ClassEvent> ClassEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

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
        }
    }
}
