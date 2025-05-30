using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Evaluations;
using BailarinaPreparadaApp.DTOs.Exercises;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.Evaluations;
using BailarinaPreparadaApp.Models.Exercises;
using BailarinaPreparadaApp.Services.Emails;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Evaluations
{
    public class EvaluationService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly EmailService _emailService;
        private readonly IConfiguration _configuration;

        public EvaluationService(ApplicationDbContext dbContext, EmailService emailService, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _emailService = emailService;
            _configuration = configuration;
        }

        public async Task<IEnumerable<EvaluationResponse>> GetEvaluationsAsync()
        {
            var evaluations = await _dbContext.Evaluations
                .AsNoTracking()
                .Include(e => e.Admin)
                .Include(e => e.User)
                .Include(e => e.Exercises)
                    .ThenInclude(ee => ee.Exercise)
                .ToListAsync();

            return evaluations.Select(MapToEvaluationResponse);
        }

        public async Task<IEnumerable<EvaluationResponse>> GetEvaluationsByUserIdAsync(string userId)
        {
            var evaluations = await _dbContext.Evaluations
                .AsNoTracking()
                .Include(e => e.Admin)
                .Include(e => e.User)
                .Include(e => e.Exercises)
                    .ThenInclude(ee => ee.Exercise)
                .Where(e => e.UserId == userId)
                .ToListAsync();

            return evaluations.Select(MapToEvaluationResponse);
        }

        public async Task<EvaluationResponse?> GetEvaluationByIdAsync(int id, string currentUserId, bool isAdmin)
        {
            var evaluation = await _dbContext.Evaluations
                .AsNoTracking()
                .Include(e => e.Admin)
                .Include(e => e.User)
                .Include(e => e.Exercises)
                    .ThenInclude(ee => ee.Exercise)
                .FirstOrDefaultAsync(e => e.EvaluationId == id);

            if (evaluation == null)
            {
                throw new NotFoundException("Avaliação não encontrada.");
            }

            PermissionHelper.CheckUserPermission(evaluation.UserId, currentUserId, isAdmin);

            return MapToEvaluationResponse(evaluation);
        }

        public async Task<(bool Success, string Message, int? EvaluationId)> CreateEvaluationAsync(CreateEvaluationRequest request)
        {
            var admin = await _dbContext.Users.FindAsync(request.AdminId);
            var user = await _dbContext.Users.FindAsync(request.UserId);

            if (admin == null || user == null)
            {
                return (false, "Usuário ou administrador não encontrado.", null);
            }

            var evaluation = new Evaluation
            {
                AdminId = request.AdminId,
                UserId = request.UserId,
                Date = request.Date,
                Admin = admin,
                User = user,
                UserGender = request.UserGender,
                Exercises = new List<EvaluationExercise>(),
                PhotosUrl = request.PhotosUrl
            };

            foreach (var exerciseRequest in request.Exercises)
            {
                var exercise = await _dbContext.Exercises.FindAsync(exerciseRequest.ExerciseId);

                if (exercise == null)
                {
                    return (false, $"Exercício com ID {exerciseRequest.ExerciseId} não encontrado.", null);
                }

                evaluation.Exercises.Add(new EvaluationExercise
                {
                    ExerciseId = exerciseRequest.ExerciseId,
                    Exercise = exercise,
                    Score = exerciseRequest.Score,
                    Observation = exerciseRequest.Observation ?? string.Empty,
                    Side = Enum.Parse<ExerciseSide>(exerciseRequest.Side, true),
                });
            }

            _dbContext.Evaluations.Add(evaluation);

            await _dbContext.SaveChangesAsync();

            return (true, "Avaliação criada com sucesso.", evaluation.EvaluationId);
        }

        public async Task SendEvaluationReadyEmailAsync(int evaluationId)
        {
            var evaluation = await _dbContext.Evaluations
                .AsNoTracking()
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.EvaluationId == evaluationId);

            if (evaluation == null)
            {
                throw new NotFoundException("Avaliação não encontrada.");
            }

            var user = evaluation.User;

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var evaluationLink = $"{_configuration["AppSettings:FrontendUrl"]}/avaliacoes/{evaluationId}";

            var templateData = new Dictionary<string, string>
            {
                { "Name", user.Name },
                { "EvaluationLink", evaluationLink }
            };

            await _emailService.SendEmailAsync(
                toName: user.Name,
                toEmail: user.Email!,
                subject: "Sua avaliação física está pronta! - App Bailarina Preparada",
                templateName: "EvaluationReadyTemplate",
                templateData: templateData
            );
        }

        public async Task<(bool Success, string Message)> UpdateEvaluationAsync(int id, List<EvaluationExerciseRequest> updatedExercises)
        {
            var evaluation = await _dbContext.Evaluations
                .Include(e => e.Exercises)
                .FirstOrDefaultAsync(e => e.EvaluationId == id);

            if (evaluation == null)
            {
                return (false, "Avaliação não encontrada.");
            }

            var updatedDict = updatedExercises.ToDictionary(
                ue => (ue.ExerciseId, Side: Enum.Parse<ExerciseSide>(ue.Side, true)),
                ue => ue
            );

            var existingDict = evaluation.Exercises.ToDictionary(
                e => (e.ExerciseId, e.Side),
                e => e
            );

            foreach (var key in updatedDict.Keys)
            {
                if (!existingDict.TryGetValue(key, out var existing))
                {
                    return (false, $"Exercício {key.ExerciseId} com lado '{key.Side}' não encontrado na avaliação.");
                }

                var update = updatedDict[key];
                existing.Score = update.Score;
                existing.Observation = update.Observation ?? string.Empty;
            }

            await _dbContext.SaveChangesAsync();

            return (true, "Avaliação atualizada com sucesso.");
        }

        public async Task<(bool Success, string Message)> UpdatePhotosUrlAsync(int evaluationId, string photosUrl)
        {
            var evaluation = await _dbContext.Evaluations.FindAsync(evaluationId);

            if (evaluation == null)
            {
                return (false, "Avaliação não encontrada.");
            }

            evaluation.PhotosUrl = photosUrl;
            await _dbContext.SaveChangesAsync();

            return (true, "Link de fotos atualizado com sucesso.");
        }

        public async Task<(bool Success, string Message)> DeleteEvaluationAsync(int id)
        {
            var evaluation = await _dbContext.Evaluations.FindAsync(id);

            if (evaluation == null)
            {
                return (false, "Avaliação não encontrada.");
            }

            _dbContext.Evaluations.Remove(evaluation);

            await _dbContext.SaveChangesAsync();

            return (true, "Avaliação excluída com sucesso.");
        }

        private static EvaluationResponse MapToEvaluationResponse(Evaluation e)
        {
            return new EvaluationResponse
            {
                EvaluationId = e.EvaluationId,
                AdminName = e.Admin.Name,
                UserName = e.User.Name,
                Date = e.Date,
                UserGender = e.UserGender,
                PhotosUrl = e.PhotosUrl,
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
                    Side = ex.Side,
                    Score = ex.Score,
                    Observation = ex.Observation
                }).ToList()
            };
        }
    }
}
