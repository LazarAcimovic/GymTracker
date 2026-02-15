import { create } from "zustand";
import type { User } from "../models/UserModel";
import { login as authServiceLogin } from "../services/api/authService.ts";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const result = await authServiceLogin(email, password);

    if (result.success && result.token) {
      const userData: User = result.user;
      set({ user: userData, token: result.token, isAuthenticated: true });
      
      localStorage.setItem("accessToken", result.token || "");
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },
}));

const initializeAuth = () => {
  const storedToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    useAuthStore.setState({ 
      token: storedToken, 
      user: JSON.parse(storedUser) ,
      isAuthenticated: true 
    });
  }
};

initializeAuth();