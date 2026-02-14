using GymTrackerApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseTypeController : ControllerBase
    {
        private readonly IExerciseTypeService _exerciseTypeService;

        public ExerciseTypeController(IExerciseTypeService exerciseTypeService)
        {
            _exerciseTypeService = exerciseTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetExerciseTypes()
        {
            var types = await _exerciseTypeService.GetAllExerciseTypesAsync();
            return Ok(types);
        }
    }
}