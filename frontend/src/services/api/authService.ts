import type {
  LoginRequest,
  LoginResponse,
  User,
  UserRegister,
} from "../../models/UserModel";
import apiClient from "./apiClient";

const mapLoginResponseToUser = (response: LoginResponse): User => {
  return {
    id: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    gender: response.gender,
  };
};

export const login = async (email: string, password: string) => {
  try {
    const loginData: LoginRequest = { email, password };

    const response = await apiClient.post<LoginResponse>(
      "/Auth/login",
      loginData,
    );

    const user = mapLoginResponseToUser(response.data);

    if (response.status === 200) {
      const accessToken  = response.data.accessToken;

      return {
        success: true,
        token: accessToken,
        user,
      };
    }
    return { success: false, token: null, user: null };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, token: null, user: null };
  }
};

export const register = async (userData: UserRegister) => {
  try {
    const response = await apiClient.post("/Auth/register", userData);
    if (response.status === 200 || response.status === 201) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false };
  }
};
