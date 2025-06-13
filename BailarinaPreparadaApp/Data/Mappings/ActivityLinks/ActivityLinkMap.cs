using BailarinaPreparadaApp.Models.ActivityLinks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.ActivityLinks;

public class ActivityLinkMap : IEntityTypeConfiguration<ActivityLink>
{
    public void Configure(EntityTypeBuilder<ActivityLink> builder)
    {
        builder.ToTable("ActivityLinks");

        builder.HasKey(x => x.ActivityLinkId)
            .HasName("PK_ActivityLinks");

        builder.Property(x => x.ActivityLinkId)
            .HasColumnType("INT")
            .IsRequired();
        
        builder.Property(x => x.Title)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(x => x.Link)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(500)
            .IsRequired();
        
        builder.Property(x => x.DefaultColor)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(30)
            .IsRequired(false);

        builder.Property(x => x.IsActive)
            .HasColumnType("BIT")
            .IsRequired();
        
        builder.HasMany(x => x.ScheduleTasks)
            .WithOne(x => x.ActivityLink)
            .HasForeignKey(x => x.ActivityLinkId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}