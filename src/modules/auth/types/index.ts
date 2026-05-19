export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    login: string;
  };
}

export interface RegisterRequest {
  name: string;
  login: string;
  password?: string;
}
