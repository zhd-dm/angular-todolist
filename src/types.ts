export interface IUser {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  name: string;
  deadline: number;
  priority?: boolean;
  category?: string;
}

export interface ICategory {
  id: number;
  name: string;
}
