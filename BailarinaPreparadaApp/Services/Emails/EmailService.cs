using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Options;
using BailarinaPreparadaApp.Configuration;

namespace BailarinaPreparadaApp.Services.Emails
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private readonly SmtpConfiguration _smtpConfig;

        public EmailService(ILogger<EmailService> logger, IOptions<SmtpConfiguration> smtpConfiguration)
        {
            _logger = logger;
            _smtpConfig = smtpConfiguration.Value;
        }

        public async Task<bool> SendEmailAsync(string toName, string toEmail, string subject, string templateName, Dictionary<string, string> templateData, string fromName = "Bella, Bailarina Preparada", string fromEmail = "contato@bailarinapreparada.com.br")
        {
            var body = await GetEmailTemplateAsync(templateName);
            body = FillTemplateWithData(body, templateData);

            var smtpClient = new SmtpClient(_smtpConfig.Host, _smtpConfig.Port)
            {
                Credentials = new NetworkCredential(_smtpConfig.UserName, _smtpConfig.Password),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress(fromEmail, fromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            
            mail.To.Add(new MailAddress(toEmail, toName));

            try
            {
                await smtpClient.SendMailAsync(mail);
                _logger.LogInformation("E-mail enviado com sucesso para {Email}", toEmail);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar e-mail para {Email}", toEmail);

                return false;
            }
        }

        public async Task<bool> SendAdminNewUserEmailAsync(string toName, string toEmail, string adminName,
            string newUserName, string newUserEmail)
        {
            var templateData = new Dictionary<string, string>
            {
                { "AdminName", adminName },
                { "Name", newUserName },
                { "Email", newUserEmail }
            };

            return await SendEmailAsync(
                toName: toName,
                toEmail: toEmail,
                subject: "Novo cadastro! - App Bailarina Preparada",
                templateName: "UserCreatedTemplate",
                templateData: templateData
            );
        }
        
        private static async Task<string> GetEmailTemplateAsync(string templateName)
        {
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates", $"{templateName}.html");

            if (!File.Exists(templatePath))
            {
                throw new FileNotFoundException($"Template {templateName} não encontrado.");
            }

            return await File.ReadAllTextAsync(templatePath);
        }

        private static string FillTemplateWithData(string templateContent, Dictionary<string, string> data)
        {
            foreach (var item in data)
            {
                templateContent = templateContent.Replace($"{{{{{item.Key}}}}}", item.Value);
            }

            return templateContent;
        }
    }
}
