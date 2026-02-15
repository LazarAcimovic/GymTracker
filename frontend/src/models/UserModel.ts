export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  expiresIn: number;
  gender: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}
