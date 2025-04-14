namespace BailarinaPreparadaApp.DTOs.ExerciseReferences
{
    public class ExerciseReferenceResponse
    {
        public int ExerciseReferenceId { get; set; }
        public int ExerciseId { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public string Gender { get; set; } = string.Empty;
        public int MinValue { get; set; }
        public int? MaxValue { get; set; }
        public string? Classification { get; set; }
        public string? Source { get; set; }
    }
}
