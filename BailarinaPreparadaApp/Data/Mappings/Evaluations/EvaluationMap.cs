using BailarinaPreparadaApp.Models.Evaluations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Evaluations;

public class EvaluationMap : IEntityTypeConfiguration<Evaluation>
{
    public void Configure(EntityTypeBuilder<Evaluation> builder)
    {
        builder.ToTable("Evaluations");

        builder.HasKey(x => x.EvaluationId)
            .HasName("PK_Evaluations");

        builder.Property(x => x.EvaluationId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.AdminId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.UserId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.Date)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.Property(x => x.UserGender)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(1)
            .IsRequired();

        builder.Property(x => x.PhotosUrl)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired(false);

        builder.HasOne(x => x.Admin)
            .WithMany()
            .HasForeignKey(x => x.AdminId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Exercises)
            .WithOne(x => x.Evaluation)
            .HasForeignKey(x => x.EvaluationId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}