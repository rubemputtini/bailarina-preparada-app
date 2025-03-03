namespace BailarinaPreparadaApp.Helpers
{
    public static class ScheduleHelper
    {
        public static TimeOnly GetTimeFromSlot(string period, int slot)
        {
            return (period, slot) switch
            {
                ("Manhã", 0) => new TimeOnly(8, 0),
                ("Manhã", 1) => new TimeOnly(10, 0),

                ("Tarde", 0) => new TimeOnly(14, 0),
                ("Tarde", 1) => new TimeOnly(16, 0),

                ("Noite", 0) => new TimeOnly(18, 0),
                ("Noite", 1) => new TimeOnly(20, 0),

                _ => new TimeOnly(0, 0)
            };
        }
    }
}
