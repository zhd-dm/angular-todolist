export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Task {
  name: string;
  deadline: number;
  priority: boolean;
  category?: string;
}
