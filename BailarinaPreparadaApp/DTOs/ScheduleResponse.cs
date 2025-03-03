namespace BailarinaPreparadaApp.DTOs
{
    public class ScheduleResponse
    {
        public int ScheduleId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public List<ScheduleTaskResponse> Tasks { get; set; } = new List<ScheduleTaskResponse>();
    }
}
