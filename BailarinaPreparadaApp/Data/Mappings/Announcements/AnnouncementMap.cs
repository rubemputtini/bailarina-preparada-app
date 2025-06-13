using BailarinaPreparadaApp.Models.Announcements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Announcements;

public class AnnouncementMap : IEntityTypeConfiguration<Announcement>
{
    public void Configure(EntityTypeBuilder<Announcement> builder)
    {
        builder.ToTable("Announcements");

        builder.HasKey(x => x.AnnouncementId)
            .HasName("PK_Announcements");

        builder.Property(x => x.AnnouncementId)
            .HasColumnType("INT")
            .IsRequired();

        builder.Property(x => x.Title)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Content)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Date)
            .HasColumnType("DATETIME2")
            .IsRequired();

        builder.Property(x => x.PublishAt)
            .HasColumnType("DATETIME2")
            .IsRequired(false);

        builder.Property(x => x.ExpiresAt)
            .HasColumnType("DATETIME2")
            .IsRequired(false);

        builder.Property(x => x.AuthorId)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.IsVisible)
            .HasColumnType("BIT")
            .IsRequired();

        builder.Property(x => x.Link)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(x => x.Category)
            .HasConversion<int>()
            .HasColumnType("INT")
            .IsRequired();

        builder.HasOne(x => x.Author)
            .WithMany()
            .HasForeignKey(x => x.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}