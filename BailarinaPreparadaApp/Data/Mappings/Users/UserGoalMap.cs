using BailarinaPreparadaApp.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Users;

public class UserGoalMap : IEntityTypeConfiguration<UserGoal>
{
    public void Configure(EntityTypeBuilder<UserGoal> builder)
    {
        builder.ToTable("UserGoals");

        builder.HasKey(x => x.UserGoalId)
            .HasName("PK_UserGoals");

        builder.Property(x => x.UserGoalId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.UserId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.Year)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.GoalDays)
            .HasColumnType("INT")
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany(x => x.Goals)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}