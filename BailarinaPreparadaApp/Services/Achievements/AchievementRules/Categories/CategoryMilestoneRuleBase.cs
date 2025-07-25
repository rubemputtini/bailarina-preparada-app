﻿using BailarinaPreparadaApp.Data;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public abstract class CategoryMilestoneRuleBase : IAchievementRule, IProgressiveAchievement
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Lazy<IAchievementService> _achievementService;

        protected abstract string Category { get; }
        protected abstract int Milestone { get; }
        public abstract string Id { get; }

        protected CategoryMilestoneRuleBase(ApplicationDbContext dbContext, Lazy<IAchievementService> achievementService)
        {
            _dbContext = dbContext;
            _achievementService = achievementService;
        }

        public async Task EvaluateAsync(string userId)
        {
            var alreadyEarned = await _dbContext.UserAchievements
                .AnyAsync(a => a.UserId == userId && a.AchievementDefinitionId == Id);
            
            if (alreadyEarned) return;
            
            var trainingCount = await _dbContext.Trainings
                .Where(t =>
                    t.UserId == userId &&
                    t.IsCompleted &&
                    t.Category == Category)
                .CountAsync();

            if (trainingCount >= Milestone)
            {
                await _achievementService.Value.GrantAchievementAsync(userId, Id);
            }
        }

        public async Task<(int current, int goal)> GetProgressAsync(string userId)
        {
            var current = await _dbContext.Trainings
                .CountAsync(t =>
                    t.UserId == userId &&
                    t.IsCompleted &&
                    t.Category == Category);

            return (current, Milestone);
        }
    }
}
