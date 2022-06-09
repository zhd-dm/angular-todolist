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
    owner: "admin@mail"
  },
  {
    id: 3,
    name: "Drink water",
    deadline: "2022-06-22T21:00:00.000Z",
    priority: true,
    category: "Test",
    owner: "default@mail"
  },
  {
    id: 4,
    name: "Listen music",
    deadline: "2022-06-22T21:00:00.000Z",
    priority: true,
    owner: "default@mail"
  }
];

export const CATEGORIES: ICategory[] = [
  {
    id: 1,
    name: "Main"
  },
  {
    id: 2,
    name: "Second"
  },
  {
    id: 3,
    name: "Other"
  }
]
