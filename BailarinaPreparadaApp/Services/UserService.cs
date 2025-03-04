using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Account;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public UserService(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<UserDetailsResponse> GetUserDetailsAsync(string? userId, string? currentUserEmail)
        {
            var user = userId == null
                ? await _userManager.Users.FirstOrDefaultAsync(u => u.Email == currentUserEmail)
                : await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var response = new UserDetailsResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber,
                City = user.City,
                Country = user.Country
            };

            return response;
        }

        public async Task<UserResponse> EditUserAsync(string userId, EditUserRequest request)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            user.Name = request.Name ?? user.Name;
            user.Email = request.Email ?? user.Email;
            user.UserName = request.Email ?? user.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.Country = request.Country;
            user.City = request.City;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                throw new ValidationException("Não foi possível atualizar o usuário.", result.Errors.Select(e => e.Description).ToList());
            }

            await _dbContext.SaveChangesAsync();

            var response = new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber,
                Country = user.Country,
                City = user.City
            };

            return response;
        }
    }
}
