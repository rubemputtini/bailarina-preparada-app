using BailarinaPreparadaApp.Models.Exercises;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Exercises;

public class ExerciseMap : IEntityTypeConfiguration<Exercise>
{
    public void Configure(EntityTypeBuilder<Exercise> builder)
    {
        builder.ToTable("Exercises");

        builder.HasKey(x => x.ExerciseId)
            .HasName("PK_Exercises");

        builder.Property(x => x.ExerciseId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.Name)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ExerciseCategory)
            .HasConversion<int>()
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.PhotoUrl)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(x => x.VideoUrl)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(x => x.IsUnilateral)
            .HasColumnType("BIT")
            .IsRequired();
    }
}