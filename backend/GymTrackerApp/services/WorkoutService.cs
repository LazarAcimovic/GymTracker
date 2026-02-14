using AutoMapper;
using GymTrackerApp.Dtos;
using GymTrackerApp.Interfaces;
using GymTrackerApp.Models;
using System.Globalization;

namespace GymTrackerApp.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IMapper _mapper;

        public WorkoutService(IWorkoutRepository workoutRepository, IMapper mapper)
        {
            _workoutRepository = workoutRepository;
            _mapper = mapper;
        }

        public async Task<WorkoutDto> AddWorkoutAsync(WorkoutCreateDto workoutDto, int userId)
        {
            var workout = _mapper.Map<Workout>(workoutDto);

            workout.UserId = userId;
            workout.CreatedAt = DateTime.Now;
            workout.IsDeleted = false;

            await _workoutRepository.AddWorkoutAsync(workout);
            await _workoutRepository.SaveChangesAsync();

            var savedWorkout = await _workoutRepository.GetWorkoutByIdAsync(workout.Id);

            return _mapper.Map<WorkoutDto>(savedWorkout);
        }

        public async Task<IEnumerable<WorkoutDto>> GetAllWorkoutsByUserIdAsync(int userId)
        {
            var workouts = await _workoutRepository.GetAllWorkoutsByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<WorkoutDto>>(workouts);
        }

        public async Task<IEnumerable<WeeklyProgressDto>> GetWeeklyProgressAsync(int userId, int month, int year)
        {
            var workouts = await _workoutRepository.GetWorkoutsByMonthAsync(userId, month, year);

            if (!workouts.Any()) return Enumerable.Empty<WeeklyProgressDto>();

            var weeklyData = workouts
                .GroupBy(w => GetWeekOfMonth(w.WorkoutDate))
                .Select(g => new WeeklyProgressDto
                {
                    WeekNumber = g.Key,
                    WorkoutCount = g.Count(),
                    TotalDuration = g.Sum(w => w.DurationMinutes),
                    AverageDifficulty = Math.Round((decimal)g.Average(w => w.Difficulty), 2),
                    AverageFatigue = Math.Round((decimal)g.Average(w => w.Fatigue), 2)
                })
                .OrderBy(w => w.WeekNumber)
                .ToList();

            return weeklyData;
        }

        private static int GetWeekOfMonth(DateTime date)
        {
            DateTime firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            int firstWeekOfYear = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                firstDayOfMonth, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

            int currentWeekOfYear = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

            return currentWeekOfYear - firstWeekOfYear + 1;
        }
    }
}