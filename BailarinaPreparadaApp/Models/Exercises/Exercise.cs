﻿namespace BailarinaPreparadaApp.Models.Exercises
{
    public class Exercise
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public ExerciseCategory ExerciseCategory { get; set; }
        public string? PhotoUrl { get; set; }
        public string? VideoUrl { get; set; }
        public bool IsUnilateral { get; set; } = false;
    }
}
