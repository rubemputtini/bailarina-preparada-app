using BailarinaPreparadaApp.DTOs.UserGoals;

namespace BailarinaPreparadaApp.Services.Users;

public interface IUserGoalService
{
    Task<UserGoalResponse> GetGoalByYearAsync(string userId, int year);

    Task<List<UserGoalResponse>> GetHistoricGoalsAsync(string userId);

    Task<UserGoalResponse> SetUserGoalAsync(string userId, SetUserGoalRequest request);
}