using BailarinaPreparadaApp.Models.Schedules;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Schedules;

public class ScheduleMap : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.ToTable("Schedules");

        builder.HasKey(x => x.ScheduleId)
            .HasName("PK_Schedules");

        builder.Property(x => x.ScheduleId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.UserId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.Property(x => x.Goal)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired(false);

        builder.Property(x => x.Observations)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired(false);

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Entries)
            .WithOne(x => x.Schedule)
            .HasForeignKey(x => x.ScheduleId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}