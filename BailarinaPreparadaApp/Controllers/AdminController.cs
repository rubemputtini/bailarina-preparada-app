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
    [Route("[controller]")]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _dbContext;

        public AdminController(UserManager<User> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userResponses = new List<UserResponse>();

            foreach(var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                userResponses.Add(new UserResponse
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email!,
                    Role = roles.FirstOrDefault()!,
                    IsAdmin = user.IsAdmin
                });
            }

            return Ok(userResponses);
        }

        [HttpGet("user-evaluations/{userId}")]
        public async Task<IActionResult> GetUserEvaluations(string userId)
        {
            try
            {
                var evaluations = await _dbContext.Evaluations
                    .Where(e => e.User.Id == userId)
                    .Include(e => e.Admin)
                    .Include(e => e.User)
                    .Include(e => e.Exercises)
                    .ThenInclude(ee => ee.Exercise)
                    .ToListAsync();

                if (evaluations.Count == 0)
                {
                    return NotFound(new { message = "Nenhuma avaliação encontrada para o usuário." });
                }

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
                return StatusCode(500, new { message = "Erro ao buscar avaliações do usuário.", details = ex.Message });
            }
        }
    }
}
