using System;
using System.Collections.Generic;

namespace GymTrackerApp.Models;

public partial class User
{
    public int Id { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Email { get; set; } = null!;

    public required string UserPassword { get; set; } = null!;

    public required string Gender { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public IEnumerable<Workout> Workouts { get; set; } = new List<Workout>();
}
