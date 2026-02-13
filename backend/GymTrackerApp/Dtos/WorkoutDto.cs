namespace GymTrackerApp.Dtos
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public required string ExerciseTypeName { get; set; } 
        public DateTime WorkoutDate { get; set; }
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public int Difficulty { get; set; }
        public int Fatigue { get; set; }
        public string? Notes { get; set; }
    }
}
