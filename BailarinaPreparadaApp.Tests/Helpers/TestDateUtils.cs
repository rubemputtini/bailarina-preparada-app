namespace BailarinaPreparadaApp.Tests.Helpers;

public static class TestDateUtils
{
    public static DateTime GetReferenceDate() => DateTime.UtcNow.Date;

    public static DateTime GetLastSunday(DateTime reference)
        => reference.AddDays(-(int)reference.DayOfWeek);

    public static DateTime GetPreviousMonday(DateTime reference)
        => GetLastSunday(reference).AddDays(-6);

    public static DateTime GetPreviousMonth(DateTime reference)
        => reference.AddMonths(-1);

    public static DateTime GetDateForWeekDay(DayOfWeek day, DateTime mondayStart)
        => day == DayOfWeek.Sunday ? mondayStart.AddDays(6) : mondayStart.AddDays((int)day - 1);
}