using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using BailarinaPreparadaApp.Models;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;

        public AccountController(SignInManager<User> signInManager, UserManager<User> userManager, TokenService tokenService, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return Unauthorized("E-mail inválido.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Senha inválida.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "user";

            var token = _tokenService.GenerateToken(user, userRole);

            return Ok(new LoginResponse
            {
                Token = token,
                Email = request.Email,
                Role = userRole
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);

            if (existingUser != null)
            {
                return BadRequest("Já existe um usuário com esse e-mail.");
            }

            var adminEmails = _configuration.GetSection("AdminSettings:AdminEmails").Get<List<string>>();

            var user = new User
            {
                Name = request.Name,
                UserName = request.Email,
                Email = request.Email,
                IsAdmin = adminEmails!.Contains(request.Email)
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new 
                { 
                    message = "Não foi possível criar uma conta.", 
                    details = result.Errors
                });
            }

            var role = user.IsAdmin ? "admin" : "user";

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            await _userManager.AddToRoleAsync(user, role);

            var token = _tokenService.GenerateToken(user, role);

            return Ok(new { message = "Usuário registrado com sucesso.", token });
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest request)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try
            {
                var user = await _userManager.FindByIdAsync(request.Id);

                if (user == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                var result = await _userManager.DeleteAsync(user);

                if (!result.Succeeded)
                {
                    await transaction.RollbackAsync();

                    return BadRequest(new { message = "Não foi possível excluir o usuário.", details = result.Errors });
                }

                await transaction.CommitAsync();

                return Ok("Usuário excluído com sucesso.");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }
}
