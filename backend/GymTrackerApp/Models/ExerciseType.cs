using System;
using System.Collections.Generic;

namespace GymTrackerApp.Models;

public partial class ExerciseType
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public IEnumerable<Workout> Workouts { get; set; } = new List<Workout>();
}
