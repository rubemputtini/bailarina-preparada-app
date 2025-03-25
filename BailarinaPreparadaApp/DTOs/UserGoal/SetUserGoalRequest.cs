using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.UserGoal
{
    public class SetUserGoalRequest
    {
        [Range(2025, 2100)]
        public int Year { get; set; }

        [Range(1, 365)]
        public int GoalDays { get; set; }
    }
}
