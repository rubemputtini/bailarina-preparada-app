using BailarinaPreparadaApp.DTOs.Announcements;

namespace BailarinaPreparadaApp.Services.Announcements;

public interface IAnnouncementService
{
    Task<List<AnnouncementResponse>> GetVisibleAnnouncementsAsync();

    Task<List<AnnouncementResponse>> GetAllAnnouncementsAsync();

    Task<AnnouncementResponse> CreateAnnouncementAsync(string authorId, CreateAnnouncementRequest request);

    Task<bool> DeleteAnnouncementAsync(int id);

    Task<bool> ToggleVisibilityAsync(int id, bool isVisible);
}