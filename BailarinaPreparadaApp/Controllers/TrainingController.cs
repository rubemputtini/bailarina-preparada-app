using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class TrainingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public TrainingController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("create-training")]
        public async Task<IActionResult> CreateTraining([FromBody] CreateTrainingRequest request)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return Unauthorized(new { message = "Usuário não autenticado." });
                }

                var training = new Training
                {
                    User = user,
                    UserId = user.Id,
                    Date = request.Date,
                    Category = request.Category,
                    Description = request.Description,
                    IsCompleted = true
                };

                _context.Trainings.Add(training);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Treino registrado com sucesso!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao registrar treino.", details = ex.Message });
            }
        }

        [HttpGet("completed-trainings")]
        public async Task<IActionResult> GetCompletedTrainingsByUser([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] string? category)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return Unauthorized(new { message = "Usuário não autenticado." });
                }

                var trainings = _context.Trainings
                    .Where(t => t.UserId == user.Id && t.IsCompleted)
                    .AsQueryable();

                if (startDate.HasValue)
                {
                    trainings = trainings.Where(t => t.Date >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    trainings = trainings.Where(t => t.Date <= endDate.Value);
                }

                if (!string.IsNullOrEmpty(category))
                {
                    trainings = trainings.Where(t => t.Category == category);
                }

                var response = await trainings
                    .Select(t => new TrainingResponse
                    {
                        TrainingId = t.TrainingId,
                        Date = t.Date,
                        Description = t.Description,
                        Category = t.Category
                    })
                    .OrderByDescending(t => t.Date)
                    .ToListAsync();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar treinos.", details = ex.Message });
            }
        }

        [HttpDelete("delete-training/{trainingId}")]
        public async Task<IActionResult> DeleteTraining(int trainingId)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return Unauthorized(new { message = "Usuário não autenticado." });
                }

                var training = await _context.Trainings.FirstOrDefaultAsync(
                    t => t.TrainingId == trainingId && t.UserId == user.Id
                    );

                if (training == null)
                {
                    return NotFound(new { message = "Treino não encontrado." });
                }

                _context.Trainings.Remove(training);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Treino excluído com sucesso!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao excluir treino.", details = ex.Message });
            }
        }
    }
}
