using BailarinaPreparadaApp.Models.ExerciseReferences;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.ExerciseReferences;

public class ExerciseReferenceMap : IEntityTypeConfiguration<ExerciseReference>
{
    public void Configure(EntityTypeBuilder<ExerciseReference> builder)
    {
        builder.ToTable("ExerciseReferences");

        builder.HasKey(x => x.ExerciseReferenceId)
            .HasName("PK_ExerciseReferences");

        builder.Property(x => x.ExerciseReferenceId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.ExerciseId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.MinAge)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.MaxAge)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.Gender)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(1)
            .IsRequired();

        builder.Property(x => x.MinValue)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.MaxValue)
            .HasColumnType("INT")
            .IsRequired(false);

        builder.Property(x => x.Classification)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired(false);

        builder.Property(x => x.Source)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(200)
            .IsRequired(false);

        builder.HasOne(x => x.Exercise)
            .WithMany()
            .HasForeignKey(x => x.ExerciseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}