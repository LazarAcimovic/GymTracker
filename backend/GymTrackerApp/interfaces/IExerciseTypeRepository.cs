using GymTrackerApp.Models;

namespace GymTrackerApp.interfaces
{
    public interface IExerciseTypeRepository
    {
        Task<IEnumerable<ExerciseType>> GetAllExerciseTypesAsync();
    }
}
