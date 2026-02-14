using GymTrackerApp.Models;

namespace GymTrackerApp.Interfaces
{
    public interface IExerciseTypeRepository
    {
        Task<IEnumerable<ExerciseType>> GetAllExerciseTypesAsync();
    }
}
