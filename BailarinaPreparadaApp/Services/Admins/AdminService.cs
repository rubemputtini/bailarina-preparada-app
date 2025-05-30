using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.DTOs.Evaluations;
using BailarinaPreparadaApp.DTOs.Exercises;
using BailarinaPreparadaApp.DTOs.Users;
using BailarinaPreparadaApp.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Admins
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
                .AsNoTracking()
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

        public async Task<List<EvaluationResponse>> GetUserEvaluationsAsync(string userId)
        {
            var evaluations = await _dbContext.Evaluations
                .AsNoTracking()
                .Where(e => e.User.Id == userId)
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

        public async Task<List<BirthdayResponse>> GetRecentBirthdaysAsync(int rangeInDays = 7)
        {
            var today = DateTime.Today;

            var users = await _userManager.Users
                .AsNoTracking()
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.DateOfBirth,
                    u.PhoneNumber
                }).ToListAsync();

            var result = users
                .Select(u =>
                {
                    var nextBirthday = GetNextBirthday(u.DateOfBirth, today);
                    var daysUntilBirthday = (nextBirthday - today).Days;
                    var ageAtNextBirthday = nextBirthday.Year - u.DateOfBirth.Year;

                    return new
                    {
                        u.Id,
                        u.Name,
                        u.DateOfBirth,
                        u.PhoneNumber,
                        Age = ageAtNextBirthday,
                        DaysUntilBirthday = daysUntilBirthday
                    };
                })
                .Where(b => b.DaysUntilBirthday >= 0 && b.DaysUntilBirthday <= rangeInDays)
                .OrderBy(b => b.DaysUntilBirthday)
                .Select(b => new BirthdayResponse
                {
                    UserId = b.Id,
                    Name = b.Name,
                    DateOfBirth = b.DateOfBirth,
                    Age = b.Age,
                    DaysUntilBirthday = b.DaysUntilBirthday,
                    PhoneNumber = b.PhoneNumber!
                })
                .ToList();

            return result;
        }

        private static DateTime GetNextBirthday(DateTime birthDate, DateTime today)
        {
            var nextBirthday = new DateTime(today.Year, birthDate.Month, birthDate.Day);

            if (nextBirthday < today)
            {
                nextBirthday = nextBirthday.AddYears(1);
            }

            return nextBirthday;
        }
    }
}
