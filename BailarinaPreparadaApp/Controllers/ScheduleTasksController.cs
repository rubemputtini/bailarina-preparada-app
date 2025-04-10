using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/schedule-tasks")]
    [Authorize(Roles = "admin")]
    public class ScheduleTasksController : BaseController
    {
        private readonly ScheduleTaskService _scheduleTaskService;

        public ScheduleTasksController(ScheduleTaskService scheduleTaskService)
        {
            _scheduleTaskService = scheduleTaskService;
        }

        [HttpDelete("{scheduleTaskId}")]
        public async Task<IActionResult> DeleteScheduleTask(int scheduleTaskId)
        {
            await _scheduleTaskService.DeleteScheduleTaskAsync(scheduleTaskId);

            return Ok(new { message = "Tarefa excluída com sucesso!" });
        }
    }
}
