using BailarinaPreparadaApp.DTOs.Calendars;

namespace BailarinaPreparadaApp.Services.Calendars;

public interface ICalendarService
{
    Task<IEnumerable<CalendarSummaryResponse>> GetCalendarSummaryAsync(string userId, DateTime startDate,
        DateTime endDate);
    
    Task<CalendarYearSummaryResponse> GetCalendarYearSummaryAsync(string userId, int year);
}