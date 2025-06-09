using BailarinaPreparadaApp.Exceptions;

namespace BailarinaPreparadaApp.Helpers
{
    public static class PermissionHelper
    {
        public static void CheckUserPermission(string targetUserId, string currentUserId, bool isAdmin)
        {
            if (!isAdmin && targetUserId != currentUserId)
            {
                throw new ForbiddenException("Você não tem permissão para executar esta ação.");
            }
        }
    }
}
