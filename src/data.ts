import { ICategory, ITask } from "./types";

export const TASKS: ITask[] = [
  {
    id: 1,
    name: "Create App",
    deadline: "2022-06-22T21:00:00.000Z",
    priority: true,
    category: "Test",
    owner: "admin@mail"
  },
  {
    id: 2,
    name: "Have lunch",
    deadline: "2022-06-22T21:00:00.000Z",
    priority: false,
    owner: ""
  },
  {
    id: 3,
    name: "Drink water",
    deadline: "2022-06-22T21:00:00.000Z",
    priority: true,
    category: "Test",
    owner: ""
  },
  {
    id: 4,
    name: "Listen music",
    deadline: "2022-06-22T21:00:00.000Z",
    priority: true,
    owner: ""
  },
  {
    id: 5,
    name: "Test task for unlogged users",
    deadline: "2022-06-22T21:00:00.000Z",
    owner: ""
  }
];

export const CATEGORIES: ICategory[] = [
  {
    id: 1,
    name: "Test category"
  }
];

export const authURL = 'http://api/auth';
export const taskURL = 'http://api/tasks';
export const categoryURL = 'http://api/categories';
