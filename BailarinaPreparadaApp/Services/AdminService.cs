using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Account;
using BailarinaPreparadaApp.DTOs.Evaluation;
using BailarinaPreparadaApp.DTOs.Exercise;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class AdminService
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _dbContext;

        public AdminService(UserManager<User> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public async Task<(IEnumerable<UserResponse> Users, int TotalUsers)> GetUsersAsync(int page = 1, int pageSize = 10)
        {
            var totalUsers = await _userManager.Users.CountAsync();

            var users = await _userManager.Users
                .OrderBy(u => u.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var userResponses = new List<UserResponse>();

            foreach (var user in users)
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

            return (userResponses, totalUsers);
        }

        public async Task<List<EvaluationResponse>?> GetUserEvaluationsAsync(string userId)
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
                return null;
            }

            var response = evaluations.Select(e => new EvaluationResponse
            {
                EvaluationId = e.EvaluationId,
                AdminName = e.Admin.Name,
                UserName = e.User.Name,
                Date = e.Date,
                UserGender = e.UserGender,
                Exercises = e.Exercises.Select(ex => new EvaluationExerciseResponse
                {
                    Exercise = new ExerciseResponse
                    {
                        ExerciseId = ex.ExerciseId,
                        Name = ex.Exercise.Name,
                        Category = ex.Exercise.ExerciseCategory.ToString(),
                        PhotoUrl = ex.Exercise.PhotoUrl,
                        VideoUrl = ex.Exercise.VideoUrl,
                        IsUnilateral = ex.Exercise.IsUnilateral
                    },
                    Score = ex.Score
                }).ToList()
            }).ToList();

            return response;
        }
    }
}
