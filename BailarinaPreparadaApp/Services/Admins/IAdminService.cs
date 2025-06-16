using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.DTOs.Evaluations;
using BailarinaPreparadaApp.DTOs.Users;

namespace BailarinaPreparadaApp.Services.Admins;

public interface IAdminService
{
    Task<(IEnumerable<UserResponse> Users, int TotalUsers)> GetUsersAsync(int page = 1, int pageSize = 10);

    Task<List<EvaluationResponse>> GetUserEvaluationsAsync(string userId);

    Task<List<BirthdayResponse>> GetRecentBirthdaysAsync(int rangeInDays = 7);
}