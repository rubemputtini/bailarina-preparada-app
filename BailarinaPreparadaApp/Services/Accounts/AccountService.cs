using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models.Addresses;
using BailarinaPreparadaApp.Models.Users;
using BailarinaPreparadaApp.Services.Emails;
using Microsoft.AspNetCore.Identity;

namespace BailarinaPreparadaApp.Services.Accounts
{
    public class AccountService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly EmailService _emailService;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;

        public AccountService(SignInManager<User> signInManager, UserManager<User> userManager, EmailService emailService, TokenService tokenService, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _emailService = emailService;
            _tokenService = tokenService;
            _roleManager = roleManager;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return null;
            }

            if (await _userManager.IsLockedOutAsync(user))
            {
                return new LoginResponse { Error = "locked" };
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, true);

            if (!result.Succeeded)
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "user";
            var token = _tokenService.GenerateToken(user, userRole);

            return new LoginResponse
            {
                Token = token,
                Email = request.Email,
                Role = userRole
            };
        }

        public async Task<(bool Success, string Message, string? Token)> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);

            if (existingUser != null)
            {
                return (false, "Já existe um usuário com esse e-mail.", null);
            }
            var adminEmails = _configuration.GetSection("AdminSettings:AdminEmails").Get<List<string>>();

            var user = new User
            {
                Name = request.Name,
                UserName = request.Email,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                IsAdmin = adminEmails!.Contains(request.Email),
                DateOfBirth = request.DateOfBirth,
                Address = new Address
                {
                    Street = request.Street,
                    Number = request.Number,
                    Complement = request.Complement,
                    Neighborhood = request.Neighborhood,
                    City = request.City,
                    State = request.State,
                    Country = request.Country,
                    PostalCode = request.PostalCode,
                    Latitude = request.Latitude,
                    Longitude = request.Longitude
                }
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return (false, "Não foi possível criar uma conta.", null);
            }

            var role = user.IsAdmin ? "admin" : "user";

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            await _userManager.AddToRoleAsync(user, role);

            var token = _tokenService.GenerateToken(user, role);

            return (true, "Usuário registrado com sucesso.", token);
        }

        public async Task<(bool Success, string Message)> DeleteUserAsync(DeleteUserRequest request)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try
            {
                var user = await _userManager.FindByIdAsync(request.Id);

                if (user == null)
                {
                    return (false, "Usuário não encontrado");
                }

                var result = await _userManager.DeleteAsync(user);

                if (!result.Succeeded)
                {
                    await transaction.RollbackAsync();

                    return (false, "Não foi possível excluir o usuário.");
                }

                await transaction.CommitAsync();

                return (true, "Usuário excluído com sucesso.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return (false, $"Erro interno: {ex.Message}");
            }
        }

        public async Task<(bool Success, string Message)> ForgotPasswordAsync(ForgotPasswordRequest request)
        {
            const string GENERIC_MESSAGE = "Se o e-mail for válido, enviaremos um link para redefinir a senha.";

            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return (true, GENERIC_MESSAGE);
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Uri.EscapeDataString(token);

            var resetLink = $"{_configuration["AppSettings:FrontendUrl"]}/redefinir-senha?token={encodedToken}&email={request.Email}";

            var templateData = new Dictionary<string, string>
            {
                { "Name", user.Name },
                { "ResetLink", resetLink }
            };

            var success = await _emailService.SendEmailAsync(
               toName: user.Name,
               toEmail: user.Email!,
               subject: "Redefinição de Senha - App Bailarina Preparada",
               templateName: "PasswordResetTemplate",
               templateData: templateData
            );

            if (!success)
            {
                throw new ValidationException("Não foi possível enviar o e-mail. Tente novamente.");
            }

            return (true, GENERIC_MESSAGE);
        }

        public async Task<(bool Success, string Message)> ResetPasswordAsync(ResetPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return (false, "Usuário não encontrado.");
            }

            if (string.IsNullOrEmpty(request.Token))
            {
                return (false, "Token inválido.");
            }

            if (string.IsNullOrEmpty(request.NewPassword))
            {
                return (false, "A nova senha não pode ser vazia.");
            }

            var token = Uri.UnescapeDataString(request.Token);
            var result = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));

                return (false, $"Não foi possível redefinir a senha: {errors}");
            }

            return (true, "Senha redefinida com sucesso.");
        }
    }
}
