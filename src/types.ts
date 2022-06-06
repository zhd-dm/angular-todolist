export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ITask {
  name: string;
  deadline: number;
  priority?: boolean;
  category?: string;
}
