export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface Task {
  name: string;
  deadline: number;
  priority?: boolean;
  category?: string;
}
