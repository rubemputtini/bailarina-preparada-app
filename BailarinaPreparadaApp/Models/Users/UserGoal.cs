namespace BailarinaPreparadaApp.Models.Users
{
    public class UserGoal
    {
        public int UserGoalId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public required User User { get; set; }
        public int Year { get; set; }
        public int GoalDays { get; set; }
    }
}
