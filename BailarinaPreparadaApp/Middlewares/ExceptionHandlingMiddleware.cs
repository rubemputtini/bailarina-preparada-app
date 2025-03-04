using BailarinaPreparadaApp.Exceptions;
using System.Net;
using System.Text.Json;

namespace BailarinaPreparadaApp.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado na API");

                context.Response.ContentType = "application/json";
                var response = new { message = "Erro interno do servidor." };
                int statusCode = (int)HttpStatusCode.InternalServerError;

                switch(ex)
                {
                    case NotFoundException:
                        statusCode = (int)HttpStatusCode.NotFound;
                        response = new { message = ex.Message };
                        break;
                    case UnauthorizedException:
                        statusCode = (int)HttpStatusCode.Unauthorized;
                        response = new { message = ex.Message };
                        break;
                    case ForbiddenException:
                        statusCode = (int)HttpStatusCode.Forbidden;
                        response = new { message = ex.Message };
                        break;
                    case ValidationException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        response = new { message = ex.Message };
                        break;
                    default:
                        statusCode = (int)HttpStatusCode.InternalServerError;
                        response = new { message = "Erro interno do servidor." };
                        break;
                }

                context.Response.StatusCode = statusCode;

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        }
    }
}
