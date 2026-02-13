using GymTrackerApp.Models;

namespace GymTrackerApp.interfaces
{
    public interface IWorkoutRepository
    {
        Task<IEnumerable<Workout>> GetAllWorkoutsByUserIdAsync(int userId);
        Task<IEnumerable<Workout>> GetWorkoutsByMonthAsync(int userId, int month, int year);
        Task AddWorkoutAsync(Workout workout);
        Task<bool> SaveChangesAsync();
    }
}
