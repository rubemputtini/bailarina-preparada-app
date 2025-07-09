namespace BailarinaPreparadaApp.Models.Trainings;

public class TrainingFeedback
{
    public int TrainingFeedbackId { get; set; }
    public int TrainingId { get; set; }
    public Training Training { get; set; } =  null!;
    public string? AdminMessage { get; set; }
    public bool IsResolvedByAdmin { get; set; } = false;
    public bool IsAcknowledgedByUser { get; set; } =  false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}