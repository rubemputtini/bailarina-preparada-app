using BailarinaPreparadaApp.Models.Trainings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Trainings;

public class TrainingFeedbackMap : IEntityTypeConfiguration<TrainingFeedback>
{
    public void Configure(EntityTypeBuilder<TrainingFeedback> builder)
    {
        builder.ToTable("TrainingFeedbacks");

        builder.HasKey(x => x.TrainingFeedbackId)
            .HasName("PK_TrainingFeedbacks");

        builder.Property(x => x.TrainingFeedbackId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.TrainingId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.AdminMessage)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired(false);

        builder.Property(x => x.IsResolvedByAdmin)
            .HasColumnType("BIT")
            .IsRequired();

        builder.Property(x => x.IsAcknowledgedByUser)
            .HasColumnType("BIT")
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.HasOne(x => x.Training)
            .WithMany()
            .HasForeignKey(x => x.TrainingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}