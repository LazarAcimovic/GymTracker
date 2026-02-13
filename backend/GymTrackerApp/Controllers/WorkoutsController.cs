using GymTrackerApp.Dtos;
using GymTrackerApp.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutsController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserWorkouts(int userId)
        {
            var workouts = await _workoutService.GetAllWorkoutsByUserIdAsync(userId);
            return Ok(workouts);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateWorkout(int userId, [FromBody] WorkoutCreateDto workoutDto)
        {
            if (workoutDto == null) return BadRequest();

            var result = await _workoutService.AddWorkoutAsync(workoutDto, userId);
            return Ok(result);
        }

        [HttpGet("stats/{userId}/{month}/{year}")]
        public async Task<IActionResult> GetWeeklyStats(int userId, int month, int year)
        {
            var stats = await _workoutService.GetWeeklyProgressAsync(userId, month, year);
            return Ok(stats);
        }
    }
}