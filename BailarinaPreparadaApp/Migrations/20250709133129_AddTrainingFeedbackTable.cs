using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BailarinaPreparadaApp.Migrations
{
    /// <inheritdoc />
    public partial class AddTrainingFeedbackTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrainingFeedbacks",
                columns: table => new
                {
                    TrainingFeedbackId = table.Column<int>(type: "INT", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainingId = table.Column<int>(type: "INT", nullable: false),
                    AdminMessage = table.Column<string>(type: "NVARCHAR(100)", maxLength: 100, nullable: true),
                    IsResolvedByAdmin = table.Column<bool>(type: "BIT", nullable: false),
                    IsAcknowledgedByUser = table.Column<bool>(type: "BIT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DATETIME2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingFeedbacks", x => x.TrainingFeedbackId);
                    table.ForeignKey(
                        name: "FK_TrainingFeedbacks_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "TrainingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingFeedbacks_TrainingId",
                table: "TrainingFeedbacks",
                column: "TrainingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingFeedbacks");
        }
    }
}
