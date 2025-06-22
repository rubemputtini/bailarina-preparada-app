namespace BailarinaPreparadaApp.Services.Emails;

public interface IEmailService
{
    Task<bool> SendEmailAsync(string toName, string toEmail, string subject, string templateName,
        Dictionary<string, string> templateData, string fromName = "Bella, Bailarina Preparada",
        string fromEmail = "contato@bailarinapreparada.com.br");

    Task<bool> SendAdminNewUserEmailAsync(string toName, string toEmail, string adminName,
        string newUserName, string newUserEmail);
}