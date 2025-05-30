using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.ActivityLinks;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models.ActivityLinks;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.ActivityLinks
{
    public class ActivityLinkService
    {
        private readonly ApplicationDbContext _dbContext;

        public ActivityLinkService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ActivityLinkResponse>> GetAllAsync()
        {
            var activityLinks = await _dbContext.ActivityLinks
                .AsNoTracking()
                .ToListAsync();

            return activityLinks.Select(link => new ActivityLinkResponse
            {
                ActivityLinkId = link.ActivityLinkId,
                Title = link.Title,
                Link = link.Link,
                DefaultColor = link.DefaultColor,
                IsActive = link.IsActive
            }).ToList();
        }

        public async Task<ActivityLinkResponse> CreateAsync(ActivityLinkRequest request)
        {
            var activityLink = new ActivityLink
            {
                Title = request.Title,
                Link = request.Link,
                DefaultColor = request.DefaultColor
            };

            _dbContext.ActivityLinks.Add(activityLink);
            await _dbContext.SaveChangesAsync();

            return MapToResponse(activityLink);
        }

        public async Task<ActivityLinkResponse> UpdateAsync(int id, ActivityLinkRequest request)
        {
            var activityLink = await _dbContext.ActivityLinks.FindAsync(id);

            if (activityLink == null)
            {
                throw new NotFoundException("Treino sugerido não encontrado.");
            }

            activityLink.Title = request.Title;
            activityLink.Link = request.Link;
            activityLink.DefaultColor = request.DefaultColor;

            await _dbContext.SaveChangesAsync();

            return MapToResponse(activityLink);
        }

        public async Task DeleteAsync(int id)
        {
            var isUsed = await _dbContext.ScheduleTasks
                .AsNoTracking()
                .AnyAsync(st => st.ActivityLinkId == id);

            if (isUsed)
            {
                throw new ValidationException(
                    "Não é possível excluir o treino sugerido.",
                    new List<string> { "Este treino está vinculado a um ou mais planejamentos." }
                );
            }

            var activityLink = await _dbContext.ActivityLinks.FindAsync(id);

            if (activityLink == null)
            {
                throw new NotFoundException("Treino sugerido não encontrado.");
            }

            _dbContext.ActivityLinks.Remove(activityLink);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<(bool Success, string Message)> ToggleStatusAsync(int id)
        {
            var activityLink = await _dbContext.ActivityLinks.FindAsync(id);

            if (activityLink == null)
            {
                throw new NotFoundException("Treino sugerido não encontrado.");
            }

            activityLink.IsActive = !activityLink.IsActive;

            await _dbContext.SaveChangesAsync();

            return (true, activityLink.IsActive ? "Treino sugerido ativado com sucesso." : "Treino sugerido desativado com sucesso.");
        }

        private static ActivityLinkResponse MapToResponse(ActivityLink activityLink)
        {
            return new ActivityLinkResponse
            {
                ActivityLinkId = activityLink.ActivityLinkId,
                Title = activityLink.Title,
                Link = activityLink.Link,
                DefaultColor = activityLink.DefaultColor,
                IsActive = activityLink.IsActive
            };
        }
    }
}
