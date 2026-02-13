using GymTrackerApp.Dtos;

namespace GymTrackerApp.Interfaces
{
    public interface IWorkoutService
    {
        Task<WorkoutDto> AddWorkoutAsync(WorkoutCreateDto workoutDto, int userId);
        Task<IEnumerable<WorkoutDto>> GetAllWorkoutsByUserIdAsync(int userId);
        Task<IEnumerable<WeeklyProgressDto>> GetWeeklyProgressAsync(int userId, int month, int year);
    }
}