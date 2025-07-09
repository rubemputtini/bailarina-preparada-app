namespace BailarinaPreparadaApp.DTOs.Trainings;

public class FeedbackAdminListResponse
{
    public int FeedbackId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public DateTime TrainingDate { get; set; }
    public string Observation { get; set; } =  string.Empty;
    public string Category { get; set; } =  string.Empty;
}