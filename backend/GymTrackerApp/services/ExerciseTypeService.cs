using AutoMapper;
using GymTrackerApp.Dtos;
using GymTrackerApp.interfaces;
using GymTrackerApp.Interfaces;

namespace GymTrackerApp.Services
{
    public class ExerciseTypeService : IExerciseTypeService
    {
        private readonly IExerciseTypeRepository _exerciseTypeRepository;
        private readonly IMapper _mapper;

        public ExerciseTypeService(IExerciseTypeRepository exerciseTypeRepository, IMapper mapper)
        {
            _exerciseTypeRepository = exerciseTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ExerciseTypeDto>> GetAllExerciseTypesAsync()
        {
            var exerciseTypes = await _exerciseTypeRepository.GetAllExerciseTypesAsync();

            // 2. Mapiramo listu modela u listu DTO-ova (Smer: Model -> DTO)
            return _mapper.Map<IEnumerable<ExerciseTypeDto>>(exerciseTypes);
        }
    }
}