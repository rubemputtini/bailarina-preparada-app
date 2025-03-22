namespace BailarinaPreparadaApp.DTOs.Ranking
{
    public class RankingResponse
    {
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int TrainingsCompleted { get; set; }
        public int DaysTrained { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}
