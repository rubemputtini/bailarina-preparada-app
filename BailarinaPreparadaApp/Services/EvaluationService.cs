using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Evaluation;
using BailarinaPreparadaApp.DTOs.Exercise;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class EvaluationService
    {
        private readonly ApplicationDbContext _dbContext;

        public EvaluationService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<EvaluationResponse>> GetEvaluationsAsync()
        {
            var evaluations = await _dbContext.Evaluations
                .Include(e => e.Admin)
                .Include(e => e.User)
                .Include(e => e.Exercises)
                    .ThenInclude(ee => ee.Exercise)
                .ToListAsync();

            var response = evaluations.Select(e => new EvaluationResponse
            {
                EvaluationId = e.EvaluationId,
                AdminName = e.Admin.Name,
                UserName = e.User.Name,
                Date = e.Date,
                Exercises = e.Exercises.Select(ex => new EvaluationExerciseResponse
                {
                    Exercise = new ExerciseResponse
                    {
                        ExerciseId = ex.ExerciseId,
                        Name = ex.Exercise.Name,
                        Category = ex.Exercise.ExerciseCategory.ToString(),
                        PhotoUrl = ex.Exercise.PhotoUrl,
                        VideoUrl = ex.Exercise.VideoUrl
                    },
                    Side = ex.Side,
                    Score = ex.Score
                }).ToList()
            });

            return response;
        }

        public async Task<EvaluationResponse?> GetEvaluationByIdAsync(int id)
        {
            var evaluation = await _dbContext.Evaluations
                .Include(e => e.Admin)
                .Include(e => e.User)
                .Include(e => e.Exercises)
                    .ThenInclude(ee => ee.Exercise)
                .FirstOrDefaultAsync(e => e.EvaluationId == id);

            if (evaluation == null)
            {
                throw new NotFoundException("Avaliação não encontrada.");
            }

            var response = new EvaluationResponse
            {
                EvaluationId = evaluation.EvaluationId,
                AdminName = evaluation.Admin.Name,
                UserName = evaluation.User.Name,
                Date = evaluation.Date,
                Exercises = evaluation.Exercises.Select(ex => new EvaluationExerciseResponse
                {
                    Exercise = new ExerciseResponse
                    {
                        ExerciseId = ex.ExerciseId,
                        Name = ex.Exercise.Name,
                        Category = ex.Exercise.ExerciseCategory.ToString(),
                        PhotoUrl = ex.Exercise.PhotoUrl,
                        VideoUrl = ex.Exercise.VideoUrl,
                    },
                    Side = ex.Side,
                    Score = ex.Score
                }).ToList()
            };

            return response;
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
                Exercises = new List<EvaluationExercise>()
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
    }
}
