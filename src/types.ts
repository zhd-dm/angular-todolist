export interface IUser {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  name: string;
  deadline: string;
  priority?: boolean;
  category?: string;
  owner?: string;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IValidate {
  status: Boolean;
  message: String;
}
