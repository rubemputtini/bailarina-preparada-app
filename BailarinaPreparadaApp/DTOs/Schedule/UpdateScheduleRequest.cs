﻿using BailarinaPreparadaApp.DTOs.ScheduleTask;

namespace BailarinaPreparadaApp.DTOs.Schedule
{
    public class UpdateScheduleRequest
    {
        public int ScheduleId { get; set; }
        public List<UpdateScheduleTaskRequest> Tasks { get; set; } = new List<UpdateScheduleTaskRequest>();
    }
}
