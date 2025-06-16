using BailarinaPreparadaApp.Services.ScheduleTasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.ScheduleTasks
{
    [ApiController]
    [Route("api/v1/schedule-tasks")]
    [Authorize(Roles = "admin")]
    public class ScheduleTasksController : BaseController
    {
        private readonly IScheduleTaskService _scheduleTaskService;

        public ScheduleTasksController(IScheduleTaskService scheduleTaskService)
        {
            _scheduleTaskService = scheduleTaskService;
        }

        [HttpDelete("{scheduleTaskId:int}")]
        public async Task<IActionResult> DeleteScheduleTask(int scheduleTaskId)
        {
            await _scheduleTaskService.DeleteScheduleTaskAsync(scheduleTaskId);

            return Ok(new { message = "Tarefa excluída com sucesso!" });
        }
    }
}
