import apiClient from "./apiClient";

export const exerciseService = {
  getAllTypes: async () => {
    const response = await apiClient.get("/ExerciseType");
    return response.data;
  },
};
