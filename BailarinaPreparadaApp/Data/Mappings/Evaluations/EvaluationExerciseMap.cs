using BailarinaPreparadaApp.Models.Evaluations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Evaluations;

public class EvaluationExerciseMap : IEntityTypeConfiguration<EvaluationExercise>
{
    public void Configure(EntityTypeBuilder<EvaluationExercise> builder)
    {
        builder.ToTable("EvaluationExercises");

        builder.HasKey(x => x.EvaluationExerciseId)
            .HasName("PK_EvaluationExercises");

        builder.Property(x => x.EvaluationExerciseId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.EvaluationId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.ExerciseId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.Side)
            .HasConversion<int>()
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.Score)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.Observation)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired();
        
        builder.HasOne(x => x.Evaluation)
            .WithMany(x => x.Exercises)
            .HasForeignKey(x => x.EvaluationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Exercise)
            .WithMany()
            .HasForeignKey(x => x.ExerciseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}