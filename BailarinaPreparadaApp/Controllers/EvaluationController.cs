using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    //[Authorize]
    public class EvaluationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvaluations()
        {
            try
            {
                var evaluations = await _context.Evaluations.ToListAsync();

                return Ok(evaluations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao obter avaliações.", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvaluationById(int id)
        {
            try
            {
                var evaluation = await _context.Evaluations.FindAsync(id);

                if (evaluation == null)
                {
                    return NotFound(new { message = "Avaliação não encontrada." });
                }

                return Ok(evaluation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao obter avaliação.", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvaluation([FromBody] CreateEvaluationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Dados inválidos.", details = ModelState });
            }

            try
            {
                var admin = await _context.Users.FindAsync(request.AdminId);
                var user = await _context.Users.FindAsync(request.UserId);

                if (admin == null || user == null)
                {
                    return BadRequest(new { message = "Usuário ou administrador não encontrado." });
                }

                var evaluation = new Evaluation
                {
                    AdminId = request.AdminId,
                    UserId = request.UserId,
                    Date = request.Date,
                    Admin = admin,
                    User = user,
                    Exercises = request.Exercises.Select(e => new EvaluationExercise
                    {
                        ExerciseName = e.Name,
                        ExerciseCategory = Enum.Parse<ExerciseCategory>(e.ExerciseCategory),
                        Score = e.Score
                    }).ToList()
                };

                _context.Evaluations.Add(evaluation);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEvaluationById), new { id = evaluation.EvaluationId }, evaluation);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Erro ao salvar a avaliação.", details = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro inesperado ao criar avaliação.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvaluation(int id, [FromBody] Evaluation evaluation)
        {
            if (id != evaluation.EvaluationId)
            {
                return BadRequest(new { message = "Avaliação não corresponde com id informado." });
            }

            _context.Entry(evaluation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EvaluationExists(id))
                {
                    return NotFound(new { message = "Avaliação não encontrada." });
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro inesperado ao atualizar avaliação.", details = ex.Message });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvaluation(int id)
        {
            try
            {
                var evaluation = await _context.Evaluations.FindAsync(id);

                if (evaluation == null)
                {
                    return NotFound(new { message = "Avaliação não encontrada." });
                }

                _context.Evaluations.Remove(evaluation);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao excluir avaliação.", details = ex.Message });
            }
        }

        private bool EvaluationExists(int id)
        {
            return _context.Evaluations.Any(e => e.EvaluationId == id);
        }
    }
}
