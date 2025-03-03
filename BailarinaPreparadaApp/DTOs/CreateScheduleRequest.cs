namespace BailarinaPreparadaApp.DTOs
{
    public class CreateScheduleRequest
    {
        public string UserId { get; set; } = string.Empty;
        public List<CreateScheduleTaskRequest> Tasks { get; set; } = new List<CreateScheduleTaskRequest>();
    }
}
