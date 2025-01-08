﻿namespace BailarinaPreparadaApp.DTOs
{
    public class ExerciseResponse
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? PhotoUrl { get; set; }
        public string? VideoUrl { get; set; }
    }
}
