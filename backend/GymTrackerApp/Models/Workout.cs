using System;
using System.Collections.Generic;

namespace GymTrackerApp.Models;

public partial class Workout
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int ExerciseTypeId { get; set; }

    public DateTime WorkoutDate { get; set; }

    public int DurationMinutes { get; set; }

    public int CaloriesBurned { get; set; }

    public int Difficulty { get; set; }

    public int Fatigue { get; set; }

    public string? Notes { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public required ExerciseType ExerciseType { get; set; }

    public required User User { get; set; }
}
