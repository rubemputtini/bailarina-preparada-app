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
    [Authorize]
    public class EvaluationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetEvaluations()
        {
            try
            {
                var evaluations = await _context.Evaluations
                    .Include(e => e.Admin)
                    .Include(e => e.User)
                    .Include(e => e.Exercises)
                        .ThenInclude(ee => ee.Exercise)
                    .ToListAsync();

                var response = evaluations.Select(e => new EvaluationResponse
                {
                    EvaluationId = e.EvaluationId,
                    AdminName = e.Admin.Name,
                    UserName = e.User.Name,
                    Date = e.Date,
                    Exercises = e.Exercises.Select(ex => new EvaluationExerciseResponse
                    {
                        Exercise = new ExerciseResponse
                        {
                            ExerciseId = ex.ExerciseId,
                            Name = ex.Exercise.Name,
                            Category = ex.Exercise.ExerciseCategory.ToString(),
                            PhotoUrl = ex.Exercise.PhotoUrl,
                            VideoUrl = ex.Exercise.VideoUrl
                        },
                        Score = ex.Score
                    }).ToList()
                });

                return Ok(response);
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
                var evaluation = await _context.Evaluations
                    .Include(e => e.Admin)
                    .Include(e => e.User)
                    .Include(e => e.Exercises)
                    .Where(e => e.EvaluationId == id)
                    .Select(e => new EvaluationResponse
                    {
                        EvaluationId = e.EvaluationId,
                        AdminName = e.Admin.Name,
                        UserName = e.User.Name,
                        Date = e.Date,
                        Exercises = e.Exercises.Select(ex => new EvaluationExerciseResponse
                        {
                            Exercise = new ExerciseResponse
                            {
                                ExerciseId = ex.ExerciseId,
                                Name = ex.Exercise.Name,
                                Category = ex.Exercise.ExerciseCategory.ToString(),
                                PhotoUrl = ex.Exercise.PhotoUrl,
                                VideoUrl = ex.Exercise.VideoUrl
                            },
                            Score = ex.Score
                        }).ToList()
                    })
                    .FirstOrDefaultAsync();

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

        [Authorize(Roles = "admin")]
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
                    Exercises = new List<EvaluationExercise>()
                };

                foreach (var exerciseRequest in request.Exercises)
                {
                    var exercise = await _context.Exercises.FindAsync(exerciseRequest.ExerciseId);

                    if (exercise == null)
                    {
                        return BadRequest(new { message = $"Exercício com ID {exerciseRequest.ExerciseId} não encontrado." });
                    }

                    evaluation.Exercises.Add(new EvaluationExercise
                    {
                        ExerciseId = exerciseRequest.ExerciseId,
                        Exercise = exercise,
                        Score = exerciseRequest.Score,
                        Observation = exerciseRequest.Observation ?? string.Empty
                    });
                }

                _context.Evaluations.Add(evaluation);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEvaluationById), new { id = evaluation.EvaluationId }, new
                {
                    message = "Avaliação criada com sucesso.",
                    evaluationId = evaluation.EvaluationId
                });
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

        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvaluation(int id, [FromBody] List<EvaluationExerciseRequest> updatedExercises)
        {
            if (updatedExercises == null || updatedExercises.Count == 0)
            {
                return BadRequest(new { message = "A lista de exercícios atualizados não pode estar vazia." });
            }

            try
            {
                var evaluation = await _context.Evaluations
                    .Include(e => e.Exercises)
                    .FirstOrDefaultAsync(e => e.EvaluationId == id);

                if (evaluation == null)
                {
                    return NotFound(new { message = "Avaliação não encontrada." });
                }

                foreach (var exerciseUpdate in  updatedExercises)
                {
                    var existingExercise = evaluation.Exercises
                        .FirstOrDefault(e => e.ExerciseId == exerciseUpdate.ExerciseId);

                    if (existingExercise == null)
                    {
                        return BadRequest(new { message = $"Exercício com ID {exerciseUpdate.ExerciseId} não encontrado na avaliação." });
                    }

                    existingExercise.Score = exerciseUpdate.Score;
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Avaliação atualizada com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro inesperado ao atualizar a avaliação.", details = ex.Message });
            }
        }

        [Authorize(Roles = "admin")]
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
