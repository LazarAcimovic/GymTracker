import apiClient from "./apiClient";
import type { WorkoutCreate } from "../../models/WorkoutModel";

export const workoutService = {
  getMyWorkouts: async () => {
    const response = await apiClient.get("/Workouts/myWorkouts");
    return response.data;
  },

  createWorkout: async (workoutData: WorkoutCreate) => {
    const response = await apiClient.post("/Workouts", workoutData);
    return response.data;
  },

  getWeeklyStats: async (month: number, year: number) => {
    const response = await apiClient.get(`/Workouts/stats/${month}/${year}`);
    return response.data;
  },
};
