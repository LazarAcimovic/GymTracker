using GymTrackerApp.Dtos;
using GymTrackerApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GymTrackerApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutsController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpGet("myWorkouts")]
        public async Task<IActionResult> GetUserWorkouts()
        {
            var userIdClaim = User.FindFirst("id")?.Value;
            if (userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var workouts = await _workoutService.GetAllWorkoutsByUserIdAsync(userId);
            return Ok(workouts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkout([FromBody] WorkoutCreateDto workoutDto)
        {
            if (workoutDto == null) return BadRequest();

            var userIdClaim = User.FindFirst("id")?.Value;
            if (userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var result = await _workoutService.AddWorkoutAsync(workoutDto, userId);
            return Ok(result);
        }

        [HttpGet("stats/{month}/{year}")]
        public async Task<IActionResult> GetWeeklyStats(int month, int year)
        {
            var userIdClaim = User.FindFirst("id")?.Value;
            if (userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var stats = await _workoutService.GetWeeklyProgressAsync(userId, month, year);
            return Ok(stats);
        }
    }
}