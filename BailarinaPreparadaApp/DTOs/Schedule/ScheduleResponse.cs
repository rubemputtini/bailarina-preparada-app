﻿using BailarinaPreparadaApp.DTOs.ScheduleTask;

namespace BailarinaPreparadaApp.DTOs.Schedule
{
    public class ScheduleResponse
    {
        public int ScheduleId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public List<ScheduleTaskResponse> Tasks { get; set; } = new List<ScheduleTaskResponse>();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
