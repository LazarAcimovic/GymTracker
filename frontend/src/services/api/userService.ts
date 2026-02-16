import apiClient from "./apiClient";

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get("/Users/me");
    return response.data;
  },
};
