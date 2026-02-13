namespace GymTrackerApp.Dtos
{
    public class WorkoutCreateDto
    {
        public int ExerciseTypeId { get; set; }
        public DateTime WorkoutDate { get; set; }
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public int Difficulty { get; set; }
        public int Fatigue { get; set; }
        public string? Notes { get; set; }
    }
}
