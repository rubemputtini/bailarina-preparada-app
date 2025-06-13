using System.ComponentModel.DataAnnotations;
using BailarinaPreparadaApp.DTOs.ScheduleTasks;

namespace BailarinaPreparadaApp.DTOs.Schedules
{
    public class UpdateScheduleRequest
    {
        [Required(ErrorMessage = "O ID do cronograma é obrigatório.")]
        public int ScheduleId { get; set; }

        [Required(ErrorMessage = "A lista de tarefas é obrigatória.")]
        public List<UpdateScheduleTaskRequest> Tasks { get; set; } = new List<UpdateScheduleTaskRequest>();

        [Required(ErrorMessage = "O objetivo é obrigatório.")]
        [StringLength(100, ErrorMessage = "O objetivo deve ter no máximo 100 caracteres.")]
        public string Goal { get; set; } = string.Empty;

        [Required(ErrorMessage = "As observações são obrigatórias.")]
        [StringLength(500, ErrorMessage = "As observações devem ter no máximo 500 caracteres.")]
        public string Observations { get; set; } = string.Empty;
    }
}