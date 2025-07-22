namespace BailarinaPreparadaApp.Helpers;

public static class CacheKeys
{
    public static string VisibleAnnouncements => "announcements_visible";
    public static string AllAnnouncements => "announcements_list";
    public static string AllActivityLinks => "activity_links_list";
    public static string AllExercises => "exercises_list";
    public static string AllExerciseReferences => "exercise_references_list";

    public static string AllUsers(int page, int pageSize) =>
        $"users_page_{page}_size_{pageSize}";

    public static string EvaluationById(int id) =>
        $"evaluation_{id}";

    public static string UserAchievements(string userId) =>
        $"achievements_user_{userId}";

    public static string UserEvaluations(string userId) =>
        $"evaluations_user_{userId}";

    public static string UserDailySchedule(string userId, int currentDayOfWeek) =>
        $"daily_schedule_{userId}_{currentDayOfWeek}";

    public static string UserSchedule(string userId) =>
        $"schedule_{userId}";

    public static string YearlyTrainingDaysCount(string userId, int year) =>
        $"yearly_training_days_count_{userId}_{year}";

    public static string CalendarSummary(string userId, DateTime startDate, DateTime endDate) =>
        $"calendar_summary_{userId}_{startDate:yyyyMMdd}_{endDate:yyyyMMdd}";

    public static string CalendarYearSummary(string userId, int year) =>
        $"calendar_year_summary_{userId}_{year}";

    public static string TrainingsByDate(string userId, DateTime date) =>
        $"trainings_by_date_{userId}_{date:yyyyMMdd}";

    public static string Ranking(int month, int year, int limit = int.MaxValue) =>
        $"ranking_{month}_{year}_limit_{limit}";

    public static string RankingAnnual(int year) =>
        $"ranking_0_{year}";

    public static string RecentBirthDays(int rangeInDays) =>
        $"birthdays_{rangeInDays}";
}