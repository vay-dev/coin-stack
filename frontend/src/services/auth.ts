import {
  type AuthResponse,
  type RegisterData,
  type LoginCredentials,
} from "./../types/user";
import api from "./api";

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/api/auth/register/", data);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/api/auth/login/",
      credentials
    );
    return response.data;
  },

  logout: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/api/auth/logout/");
    return response.data;
  },
};
