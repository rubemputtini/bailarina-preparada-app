using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.UserGoals
{
    public class SetUserGoalRequest
    {
        [Range(2025, 2100, ErrorMessage = "O ano deve estar entre 2025 e 2100.")]
        public int Year { get; set; }

        [Range(1, 365, ErrorMessage = "A meta de dias deve estar entre 1 e 365.")]
        public int GoalDays { get; set; }
    }
}