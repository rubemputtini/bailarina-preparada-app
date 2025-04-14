using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.UserGoals;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models;
using BailarinaPreparadaApp.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Users
{
    public class UserGoalService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public UserGoalService(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<UserGoalResponse> GetGoalByYearAsync(string userId, int year)
        {
            var goal = await _dbContext.UserGoals
                .FirstOrDefaultAsync(ug => ug.UserId == userId && ug.Year == year);

            if (goal == null)
            {
                throw new NotFoundException("Meta do usuário não encontrada.");
            }

            var response = new UserGoalResponse
            {
                Year = goal.Year,
                GoalDays = goal.GoalDays
            };

            return response;
        }

        public async Task<List<UserGoalResponse>> GetHistoricGoalsAsync(string userId)
        {
            var goals = await _dbContext.UserGoals
                .Where(ug => ug.UserId == userId)
                .OrderBy(ug => ug.Year)
                .Select(ug => new UserGoalResponse
                {
                    Year = ug.Year,
                    GoalDays = ug.GoalDays
                })
                .ToListAsync();

            return goals;
        }

        public async Task<UserGoalResponse> SetUserGoalAsync(string userId, SetUserGoalRequest request)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var goal = await _dbContext.UserGoals
                .FirstOrDefaultAsync(ug => ug.UserId == userId && ug.Year == request.Year);

            if (goal == null)
            {
                goal = new UserGoal
                {
                    UserId = userId,
                    User = user,
                    Year = request.Year,
                    GoalDays = request.GoalDays
                };

                await _dbContext.UserGoals.AddAsync(goal);
            }
            else
            {
                goal.GoalDays = request.GoalDays;
            }

            await _dbContext.SaveChangesAsync();

            var response = new UserGoalResponse
            {
                Year = goal.Year,
                GoalDays = goal.GoalDays
            };

            return response;
        }
    }
}
