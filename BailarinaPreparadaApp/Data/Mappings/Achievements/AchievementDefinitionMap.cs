using BailarinaPreparadaApp.Models.Achievements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Achievements;

public class AchievementDefinitionMap : IEntityTypeConfiguration<AchievementDefinition>
{
    public void Configure(EntityTypeBuilder<AchievementDefinition> builder)
    {
        builder.ToTable("AchievementDefinitions");

        builder.HasKey(x => x.AchievementDefinitionId)
            .HasName("PK_AchievementDefinitions");

        builder.Property(x => x.AchievementDefinitionId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(x => x.Title)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(80)
            .IsRequired();
        
        builder.Property(x => x.Description)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired();
        
        builder.Property(x => x.Icon)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .HasColumnType("BIT")
            .IsRequired();
    }
}