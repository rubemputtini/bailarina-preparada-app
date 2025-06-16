using BailarinaPreparadaApp.DTOs.ActivityLinks;

namespace BailarinaPreparadaApp.Services.ActivityLinks;

public interface IActivityLinkService
{
    Task<List<ActivityLinkResponse>> GetAllAsync();

    Task<ActivityLinkResponse> CreateAsync(ActivityLinkRequest request);

    Task<ActivityLinkResponse> UpdateAsync(int id, ActivityLinkRequest request);

    Task DeleteAsync(int id);

    Task<(bool Success, string Message)> ToggleStatusAsync(int id);
}