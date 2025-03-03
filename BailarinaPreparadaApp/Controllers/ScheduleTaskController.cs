using BailarinaPreparadaApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(Roles = "admin")]
    public class ScheduleTaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpDelete("delete-scheduleTask/{scheduleTaskId}")]
        public async Task<IActionResult> DeleteScheduleTask(int scheduleTaskId)
        {
            var task = await _context.ScheduleTasks.FindAsync(scheduleTaskId);

            if (task == null)
            {
                return NotFound(new { message = "Tarefa não encontrada." });
            }

            try
            {
                _context.ScheduleTasks.Remove(task);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Tarefa removida com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao remover tarefa.", details = ex.Message });
            }
        }
    }
}
