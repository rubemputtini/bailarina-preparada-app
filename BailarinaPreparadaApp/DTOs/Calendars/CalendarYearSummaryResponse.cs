namespace BailarinaPreparadaApp.DTOs.Calendars;

public class CalendarYearSummaryResponse
{
    public int Year { get; set; }
    public int TotalTrainings { get; set; }
    public int DaysTrained { get; set; }
    public List<CalendarSummaryResponse> DailySummaries { get; set; } =  new List<CalendarSummaryResponse>();
}