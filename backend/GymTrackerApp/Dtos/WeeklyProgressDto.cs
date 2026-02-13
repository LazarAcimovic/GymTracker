namespace GymTrackerApp.Dtos
{
    public class WeeklyProgressDto
    {
        public int WeekNumber { get; set; }     
        public int TotalDuration { get; set; } 
        public int WorkoutCount { get; set; } 
        public decimal AverageDifficulty { get; set; } 
        public decimal AverageFatigue { get; set; }    
    }
}
