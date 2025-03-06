using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Account;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Identity;

namespace BailarinaPreparadaApp.Services
{
    public class AccountService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;

        public AccountService(SignInManager<User> signInManager, UserManager<User> userManager, TokenService tokenService, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
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
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

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
                    PostalCode = request.PostalCode
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
    }
}
