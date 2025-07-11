﻿using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Users
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public UserService(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<UserDetailsResponse> GetUserDetailsAsync(string? userId, string? currentUserEmail, string currentUserId, bool isAdmin)
        {
            var user = userId == null
                ? await _userManager.Users
                    .AsNoTracking()
                    .Include(u => u.Address)
                    .FirstOrDefaultAsync(u => u.Email == currentUserEmail)
                : await _userManager.Users
                    .AsNoTracking()
                    .Include(u => u.Address)
                    .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            PermissionHelper.CheckUserPermission(user.Id, currentUserId, isAdmin);

            var response = new UserDetailsResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber!,
                DateOfBirth = user.DateOfBirth,
                Street = user.Address.Street,
                Number = user.Address.Number,
                Complement = user.Address.Complement,
                Neighborhood = user.Address.Neighborhood,
                City = user.Address.City,
                State = user.Address.State,
                Country = user.Address.Country,
                PostalCode = user.Address.PostalCode,
                Latitude = user.Address.Latitude,
                Longitude = user.Address.Longitude
            };

            return response;
        }

        public async Task<UserResponse> EditUserAsync(string userId, EditUserRequest request, string currentUserId, bool isAdmin)
        {
            var user = await _userManager.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            PermissionHelper.CheckUserPermission(userId, currentUserId, isAdmin);

            user.Name = request.Name;
            user.Email = request.Email;
            user.UserName = request.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.DateOfBirth = request.DateOfBirth;
            user.Address.Street = request.Street;
            user.Address.Number = request.Number;
            user.Address.Complement = request.Complement ?? user.Address.Complement;
            user.Address.Neighborhood = request.Neighborhood;
            user.Address.City = request.City;
            user.Address.State = request.State;
            user.Address.Country = request.Country;
            user.Address.PostalCode = request.PostalCode;
            user.Address.Latitude = request.Latitude ?? user.Address.Latitude;
            user.Address.Longitude = request.Longitude ?? user.Address.Longitude;

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
                PhoneNumber = user.PhoneNumber!,
                DateOfBirth = user.DateOfBirth,
                Street = user.Address.Street,
                Number = user.Address.Number,
                Complement = user.Address.Complement,
                Neighborhood = user.Address.Neighborhood,
                City = user.Address.City,
                State = user.Address.State,
                Country = user.Address.Country,
                PostalCode = user.Address.PostalCode,
                Latitude = user.Address.Latitude,
                Longitude = user.Address.Longitude
            };

            return response;
        }
    }
}
