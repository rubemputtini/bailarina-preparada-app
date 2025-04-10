using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected string CurrentUserId => 
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            ?? throw new UnauthorizedAccessException("Usuário não autenticado.");

        protected string CurrentUserEmail =>
            User.FindFirst(ClaimTypes.Email)!.Value
            ?? throw new UnauthorizedAccessException("Usuário não autenticado.");

        protected bool IsAdmin => User.IsInRole("admin");
    }
}
