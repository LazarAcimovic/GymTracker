using GymTrackerApp.interfaces;
using GymTrackerApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerApp.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly AppDbContext _context;

        public WorkoutRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Workout>> GetAllWorkoutsByUserIdAsync(int userId)
        {
            return await _context.Workouts
                .Include(w => w.ExerciseType)
                .Where(w => w.UserId == userId && !w.IsDeleted)
                .OrderByDescending(w => w.WorkoutDate)
                .ToListAsync();
        }


        public async Task<IEnumerable<Workout>> GetWorkoutsByUserIdAsync(int userId, int month, int year)
        {
            return await _context.Workouts
                .Include(w => w.ExerciseType) // Navigacija ka tipu vežbe
                .Where(w => w.UserId == userId &&
                            w.WorkoutDate.Month == month &&
                            w.WorkoutDate.Year == year &&
                            !w.IsDeleted)
                .ToListAsync();
        }

        public async Task AddWorkoutAsync(Workout workout)
        {
            await _context.Workouts.AddAsync(workout);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}