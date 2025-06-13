using BailarinaPreparadaApp.Models.Addresses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BailarinaPreparadaApp.Data.Mappings.Addresses;

public class AddressMap : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.ToTable("Addresses");

            builder.HasKey(x => x.AddressId)
                   .HasName("PK_Addresses");

            builder.Property(x => x.AddressId)
                   .HasColumnType("INT")
                   .IsRequired();

            builder.Property(x => x.Street)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(x => x.Number)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(20)
                   .IsRequired();

            builder.Property(x => x.Complement)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(100);

            builder.Property(x => x.Neighborhood)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(60)
                   .IsRequired();

            builder.Property(x => x.City)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(60)
                   .IsRequired();

            builder.Property(x => x.State)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(x => x.Country)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(x => x.PostalCode)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(20)
                   .IsRequired();

            builder.Property(x => x.Latitude)
                   .HasColumnType("FLOAT");

            builder.Property(x => x.Longitude)
                   .HasColumnType("FLOAT");

            builder.Property(x => x.UserId)
                   .HasColumnType("NVARCHAR")
                   .HasMaxLength(450)
                   .IsRequired();

            builder.HasOne(x => x.User)
                   .WithOne(u => u.Address)
                   .HasForeignKey<Address>(x => x.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
    }
}