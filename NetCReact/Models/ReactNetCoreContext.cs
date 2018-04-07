using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NetCReact.Models
{
    public partial class ReactNetCoreContext : DbContext
    {
        public virtual DbSet<TblEquipos> TblEquipos { get; set; }
        public virtual DbSet<TblJugadores> TblJugadores { get; set; }
        public virtual DbSet<TblUsuarios> TblUsuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-JAA2AET\SQLEXPRESS;Initial Catalog=ReactNetCore;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblEquipos>(entity =>
            {
                entity.HasKey(e => e.EquIdEquipo);

                entity.Property(e => e.EquIdEquipo).HasColumnName("equIdEquipo");

                entity.Property(e => e.EquNombreEquipo)
                    .IsRequired()
                    .HasColumnName("equNombreEquipo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

            });

            modelBuilder.Entity<TblJugadores>(entity =>
            {
                entity.HasKey(e => e.JugIdJugador);

                entity.ToTable("tblJugadores");

                entity.Property(e => e.JugIdJugador).HasColumnName("jugIdJugador");

                entity.Property(e => e.JugIdEquipo).HasColumnName("jugIdEquipo");

                entity.Property(e => e.JugNombreJugador)
                    .IsRequired()
                    .HasColumnName("jugNombreJugador")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.JugIdEquipoNavigation)
                    .WithMany(p => p.TblJugadores)
                    .HasForeignKey(d => d.JugIdEquipo)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Fk_JJug_IdEquipo");
            });

            modelBuilder.Entity<TblUsuarios>(entity =>
            {
                entity.HasKey(e => e.UsuIdUsuario);

                entity.Property(e => e.UsuIdUsuario).HasColumnName("usuIdUsuario");

                entity.Property(e => e.UsuContrasenia)
                    .IsRequired()
                    .HasColumnName("usuContrasenia")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UsuNombreUsuario)
                    .IsRequired()
                    .HasColumnName("usuNombreUsuario")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
