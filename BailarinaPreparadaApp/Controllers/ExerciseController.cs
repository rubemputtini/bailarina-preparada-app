using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(Roles = "admin")]
    public class ExerciseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExerciseController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExercises()
        {
            try
            {
                var exercises = await _context.Exercises
                    .ToListAsync();

                var response = exercises.Select(e => new ExerciseResponse
                {
                    ExerciseId = e.ExerciseId,
                    Name = e.Name,
                    Category = e.ExerciseCategory.ToString(),
                    PhotoUrl = e.PhotoUrl,
                    VideoUrl = e.VideoUrl
                }).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao obter exercícios.", details = ex.Message });
            }
        }
    }
}
