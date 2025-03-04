using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(Roles = "admin")]
    public class ScheduleTaskController : ControllerBase
    {
        private readonly ScheduleTaskService _scheduleTaskService;

        public ScheduleTaskController(ScheduleTaskService scheduleTaskService)
        {
            _scheduleTaskService = scheduleTaskService;
        }

        [HttpDelete("delete-scheduleTask/{scheduleTaskId}")]
        public async Task<IActionResult> DeleteScheduleTask(int scheduleTaskId)
        {
            await _scheduleTaskService.DeleteScheduleTaskAsync(scheduleTaskId);

            return Ok(new { message = "Tarefa excluída com sucesso!" });
        }
    }
}
