using BailarinaPreparadaApp.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Users;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("AspNetUsers");

        builder.Property(x => x.Name)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(80)
            .IsRequired();

        builder.Property(x => x.IsAdmin)
            .HasColumnType("BIT")
            .IsRequired();

        builder.Property(x => x.DateOfBirth)
            .HasColumnType("DATE")
            .IsRequired();

        builder.HasMany(x => x.Goals)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}