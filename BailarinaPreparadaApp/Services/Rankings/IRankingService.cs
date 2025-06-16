using BailarinaPreparadaApp.DTOs.Rankings;

namespace BailarinaPreparadaApp.Services.Rankings;

public interface IRankingService
{
    Task<IEnumerable<RankingResponse>> GetRankingAsync(int? month, int? year, int? limit = null);
}