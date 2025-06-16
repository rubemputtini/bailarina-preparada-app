using BailarinaPreparadaApp.Models.Users;

namespace BailarinaPreparadaApp.Services;

public interface ITokenService
{
    string GenerateToken(User user, string role);
}