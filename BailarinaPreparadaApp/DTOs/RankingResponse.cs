namespace BailarinaPreparadaApp.DTOs
{
    public class RankingResponse
    {
        public string UserName { get; set; } = string.Empty;
        public int Points { get; set; }
        public int DaysTrained { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}
