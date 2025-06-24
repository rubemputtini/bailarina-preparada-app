using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.DTOs.Evaluations;
using BailarinaPreparadaApp.DTOs.Exercises;
using BailarinaPreparadaApp.DTOs.Users;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.Admins
{
    public class AdminService : IAdminService
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMemoryCache _memoryCache;

        public AdminService(UserManager<User> userManager, ApplicationDbContext dbContext, IMemoryCache memoryCache)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _memoryCache = memoryCache;
        }

        public async Task<(IEnumerable<UserResponse> Users, int TotalUsers)> GetUsersAsync(int page = 1, int pageSize = 10, string? searchTerm = null)
        {
            var isSearch = !string.IsNullOrEmpty(searchTerm);
            var cacheKey = CacheKeys.AllUsers(page, pageSize);

            if (!isSearch && _memoryCache.TryGetValue(cacheKey, out (IEnumerable<UserResponse> Users, int TotalUsers) cachedUsers))
                return cachedUsers;
            
            var query = _userManager.Users.AsQueryable();

            if (isSearch)
            {
                query = query.Where(u =>
                    u.Name.Contains(searchTerm!) ||
                    u.Email!.Contains(searchTerm!));
            }
            
            var totalUsers = await query.CountAsync();

            var users = await query
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

            var result = (userResponses, totalUsers);

            if (!isSearch)
            {
                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set(cacheKey, result, cacheOptions);
            }

            return result;
        }

        public async Task<List<EvaluationResponse>> GetUserEvaluationsAsync(string userId)
        {
            var cacheKey = CacheKeys.UserEvaluations(userId);
            
            if (_memoryCache.TryGetValue(cacheKey, out List<EvaluationResponse>? cachedEvaluations))
                return cachedEvaluations;
            
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

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromDays(30));
            
            _memoryCache.Set(cacheKey, response, cacheOptions);

            return response;
        }

        public async Task<List<BirthdayResponse>> GetRecentBirthdaysAsync(int rangeInDays = 7)
        {
            var cacheKey = CacheKeys.RecentBirthDays(rangeInDays);
            
            if (_memoryCache.TryGetValue(cacheKey, out List<BirthdayResponse>? cachedBirthdays))
                return cachedBirthdays;
            
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

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(12));
            
            _memoryCache.Set(cacheKey, result, cacheOptions);

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
