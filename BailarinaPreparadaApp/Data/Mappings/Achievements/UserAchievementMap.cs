using BailarinaPreparadaApp.Models.Achievements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Achievements;

public class UserAchievementMap : IEntityTypeConfiguration<UserAchievement>
{
    public void Configure(EntityTypeBuilder<UserAchievement> builder)
    {
        builder.ToTable("UserAchievements");
        
        builder.HasKey(x => x.UserAchievementId)
            .HasName("PK_UserAchievements");

        builder.Property(x => x.UserAchievementId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.UserId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.AchievementDefinitionId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(x => x.AchievedAt)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.Property(x => x.Sequence)
            .HasColumnType("INT")
            .IsRequired(false);
        
        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.AchievementDefinition)
            .WithMany()
            .HasForeignKey(x => x.AchievementDefinitionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}