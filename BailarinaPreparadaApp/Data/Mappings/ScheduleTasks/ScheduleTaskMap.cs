using BailarinaPreparadaApp.Models.ScheduleTasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.ScheduleTasks;

public class ScheduleTaskMap : IEntityTypeConfiguration<ScheduleTask>
{
       public void Configure(EntityTypeBuilder<ScheduleTask> builder)
       {
              builder.ToTable("ScheduleTasks");

              builder.HasKey(x => x.ScheduleTaskId)
                     .HasName("PK_ScheduleTasks");

              builder.Property(x => x.ScheduleTaskId)
                     .HasColumnType("INT")
                     .IsRequired();

              builder.Property(x => x.ScheduleId)
                     .HasColumnType("INT")
                     .IsRequired();

              builder.Property(x => x.DayOfWeek)
                     .HasConversion<int>()
                     .HasColumnType("INT")
                     .IsRequired();

              builder.Property(x => x.Slot)
                     .HasColumnType("INT")
                     .IsRequired();

              builder.Property(x => x.Period)
                     .HasColumnType("NVARCHAR")
                     .HasMaxLength(20)
                     .IsRequired();

              builder.Property(x => x.Activity)
                     .HasColumnType("NVARCHAR")
                     .HasMaxLength(50)
                     .IsRequired();

              builder.Property(x => x.Notes)
                     .HasColumnType("NVARCHAR")
                     .HasMaxLength(100)
                     .IsRequired(false);

              builder.Property(x => x.Color)
                     .HasColumnType("NVARCHAR")
                     .HasMaxLength(30)
                     .IsRequired();

              builder.Property(x => x.Link)
                     .HasColumnType("NVARCHAR")
                     .HasMaxLength(500)
                     .IsRequired(false);

              builder.Property(x => x.ActivityLinkId)
                     .HasColumnType("INT")
                     .IsRequired(false);

              builder.HasOne(x => x.Schedule)
                     .WithMany(x => x.Entries)
                     .HasForeignKey(x => x.ScheduleId)
                     .OnDelete(DeleteBehavior.Cascade);

              builder.HasOne(x => x.ActivityLink)
                     .WithMany(x => x.ScheduleTasks)
                     .HasForeignKey(x => x.ActivityLinkId)
                     .OnDelete(DeleteBehavior.Restrict);
       }
}