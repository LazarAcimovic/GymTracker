using GymTrackerApp.Dtos;

namespace GymTrackerApp.Interfaces
{
    public interface IExerciseTypeService
    {
        Task<IEnumerable<ExerciseTypeDto>> GetAllExerciseTypesAsync();
    }
}
