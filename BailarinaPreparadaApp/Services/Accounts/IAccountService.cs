using BailarinaPreparadaApp.DTOs.Accounts;

namespace BailarinaPreparadaApp.Services.Accounts;

public interface IAccountService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);

    Task<(bool Success, string Message, string? Token)> RegisterAsync(RegisterRequest request);

    Task<(bool Success, string Message)> DeleteUserAsync(DeleteUserRequest request);

    Task<(bool Success, string Message)> ForgotPasswordAsync(ForgotPasswordRequest request);

    Task<(bool Success, string Message)> ResetPasswordAsync(ResetPasswordRequest request);
}