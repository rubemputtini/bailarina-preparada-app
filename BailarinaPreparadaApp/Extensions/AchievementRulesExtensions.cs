﻿using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Milestones;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Rankings;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Streaks;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Trainings;

namespace BailarinaPreparadaApp.Extensions
{
    public static class AchievementRulesExtensions
    {
        public static void AddAchievementRules(this IServiceCollection services)
        {
            services.AddScoped<Lazy<IAchievementService>>(provider =>
            {
                return new Lazy<IAchievementService>(() =>
                    provider.GetRequiredService<IAchievementService>());
            });

            services.AddScoped<Lazy<ITrainingService>>(provider =>
            {
                return new Lazy<ITrainingService>(() =>
                    provider.GetRequiredService<ITrainingService>());
            });

            // Milestones
            services.AddScoped<IAchievementRule, GoalCompletedRule>();
            services.AddScoped<IAchievementRule, PerfectMonthRule>();

            // Streaks
            services.AddScoped<IAchievementRule, PerfectWeekRule>();

            // Rankings
            services.AddScoped<IAchievementRule, Top1MonthlyRule>();
            services.AddScoped<IAchievementRule, Top5MonthlyRule>();

            // Categories
            services.AddScoped<IAchievementRule, Cardio100Rule>();
            services.AddScoped<IAchievementRule, Core100Rule>();
            services.AddScoped<IAchievementRule, EnDehors100Rule>();
            services.AddScoped<IAchievementRule, Feet100Rule>();
            services.AddScoped<IAchievementRule, Flex100Rule>();
            services.AddScoped<IAchievementRule, PBT100Rule>();
            services.AddScoped<IAchievementRule, Power100Rule>();
            services.AddScoped<IAchievementRule, Solo100Rule>();
            services.AddScoped<IAchievementRule, Strength100Rule>();
        }
    }
}
