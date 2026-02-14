using GymTrackerApp.Interfaces;
using GymTrackerApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerApp.Repositories
{
    public class ExerciseTypeRepository : IExerciseTypeRepository
    {
        private readonly AppDbContext _context;

        public ExerciseTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExerciseType>> GetAllExerciseTypesAsync()
        {
            return await _context.ExerciseTypes.ToListAsync();
        }
    }
}