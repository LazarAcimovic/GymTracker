using GymTrackerApp.Dtos;

namespace GymTrackerApp.interfaces
{
    public interface IExerciseTypeService
    {
        Task<IEnumerable<ExerciseTypeDto>> GetAllExerciseTypesAsync();
    }
}
