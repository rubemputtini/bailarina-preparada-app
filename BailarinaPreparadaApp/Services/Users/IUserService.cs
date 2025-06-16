using BailarinaPreparadaApp.DTOs.Accounts;

namespace BailarinaPreparadaApp.Services.Users;

public interface IUserService
{
    Task<UserDetailsResponse> GetUserDetailsAsync(string? userId, string? currentUserEmail, string currentUserId,
        bool isAdmin);

    Task<UserResponse> EditUserAsync(string userId, EditUserRequest request, string currentUserId, bool isAdmin);
}