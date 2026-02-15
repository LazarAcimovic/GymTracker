export interface Workout {
  id: number;
  exerciseTypeName: string;
  workoutDate: string;
  durationMinutes: number;
  caloriesBurned: number;
  difficulty: number;
  fatigue: number;
  notes?: string;
}

export interface WorkoutCreate {
  exerciseTypeId: number;
  workoutDate: string;
  durationMinutes: number;
  caloriesBurned: number;
  difficulty: number;
  fatigue: number;
  notes?: string;
}

export interface WeeklyProgress {
  weekNumber: number;
  workoutCount: number;
  totalDuration: number;
  averageDifficulty: number;
  averageFatigue: number;
}
