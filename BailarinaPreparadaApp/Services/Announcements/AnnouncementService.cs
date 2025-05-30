using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Announcements;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models.Announcements;
using BailarinaPreparadaApp.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Announcements
{
    public class AnnouncementService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public AnnouncementService(ApplicationDbContext context, UserManager<User> userManager)
        {
            _dbContext = context;
            _userManager = userManager;
        }

        public async Task<List<AnnouncementResponse>> GetVisibleAnnouncementsAsync()
        {
            var now = DateTime.UtcNow;

            var announcements = await _dbContext.Announcements
                .AsNoTracking()
                .Include(a => a.Author)
                .Where(a =>
                    (a.IsVisible || a.PublishAt != null && a.PublishAt <= now) &&
                    (a.ExpiresAt == null || a.ExpiresAt >= now))
                .OrderByDescending(a => a.Date)
                .ToListAsync();

            var response = announcements.Select(a => new AnnouncementResponse
            {
                AnnouncementId = a.AnnouncementId,
                Title = a.Title,
                Content = a.Content,
                Date = a.Date,
                PublishAt = a.PublishAt,
                ExpiresAt = a.ExpiresAt,
                AuthorName = a.Author.Name,
                IsVisible = a.IsVisible,
                Link = a.Link,
                Category = a.Category.ToString()
            }).ToList();

            return response;
        }

        public async Task<List<AnnouncementResponse>> GetAllAnnouncementsAsync()
        {
            var announcements = await _dbContext.Announcements
                 .AsNoTracking()
                 .Include(a => a.Author)
                 .OrderByDescending(a => a.Date)
                 .ToListAsync();

            var response = announcements.Select(a => new AnnouncementResponse
            {
                AnnouncementId = a.AnnouncementId,
                Title = a.Title,
                Content = a.Content,
                Date = a.Date,
                PublishAt = a.PublishAt,
                ExpiresAt = a.ExpiresAt,
                AuthorName = a.Author.Name,
                IsVisible = a.IsVisible,
                Link = a.Link,
                Category = a.Category.ToString()
            }).ToList();

            return response;
        }

        public async Task<AnnouncementResponse> CreateAnnouncementAsync(string authorId, CreateAnnouncementRequest request)
        {
            var user = await _userManager.FindByIdAsync(authorId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var announcement = new Announcement
            {
                Title = request.Title,
                Content = request.Content,
                Date = request.Date,
                PublishAt = request.PublishAt,
                ExpiresAt = request.ExpiresAt,
                IsVisible = request.IsVisible,
                Link = request.Link,
                Category = Enum.Parse<AnnouncementCategory>(request.Category),
                AuthorId = authorId,
                Author = user
            };

            _dbContext.Announcements.Add(announcement);
            await _dbContext.SaveChangesAsync();

            var response = new AnnouncementResponse
            {
                AnnouncementId = announcement.AnnouncementId,
                Title = announcement.Title,
                Content = announcement.Content,
                Date = announcement.Date,
                PublishAt = announcement.PublishAt,
                ExpiresAt = announcement.ExpiresAt,
                AuthorName = announcement.Author.Name,
                IsVisible = announcement.IsVisible,
                Link = announcement.Link,
                Category = announcement.Category.ToString(),
            };

            return response;
        }

        public async Task<bool> DeleteAnnouncementAsync(int id)
        {
            var announcement = await _dbContext.Announcements.FindAsync(id);

            if (announcement == null)
            {
                throw new NotFoundException("Aviso não encontrado.");
            }

            _dbContext.Announcements.Remove(announcement);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ToggleVisibilityAsync(int id, bool isVisible)
        {
            var announcement = await _dbContext.Announcements.FindAsync(id);

            if (announcement == null)
            {
                throw new NotFoundException("Aviso não encontrado.");
            }

            announcement.IsVisible = isVisible;
            await _dbContext.SaveChangesAsync();

            return true;
        }

    }
}
