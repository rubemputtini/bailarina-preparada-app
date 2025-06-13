using BailarinaPreparadaApp.Models.Trainings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Trainings;

public class TrainingMap : IEntityTypeConfiguration<Training>
{
    public void Configure(EntityTypeBuilder<Training> builder)
    {
        builder.ToTable("Trainings");

        builder.HasKey(x => x.TrainingId)
            .HasName("PK_Trainings");

        builder.Property(x => x.TrainingId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.UserId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.Date)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.Property(x => x.Description)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Category)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.IsCompleted)
            .HasColumnType("BIT")
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}