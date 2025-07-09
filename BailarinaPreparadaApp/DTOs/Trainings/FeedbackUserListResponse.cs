namespace BailarinaPreparadaApp.DTOs.Trainings;

public class FeedbackUserListResponse
{
    public int FeedbackId { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime TrainingDate { get; set; }
    public string Category { get; set; }  = string.Empty;
}