using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Exceptions;

namespace BailarinaPreparadaApp.Services
{
    public class ScheduleTaskService
    {
        private readonly ApplicationDbContext _dbContext;

        public ScheduleTaskService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DeleteScheduleTaskAsync(int scheduleTaskId)
        {
            var task = await _dbContext.ScheduleTasks.FindAsync(scheduleTaskId);

            if (task == null)
            {
                throw new NotFoundException("Tarefa não encontrada.");
            }

            _dbContext.ScheduleTasks.Remove(task);
            await _dbContext.SaveChangesAsync();
        }
    }
}
