import { Injectable } from '@angular/core';

import { Task } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(tasks: Task[]) {

  }

  updateTask(task: Task) {

  }

  saveTask(newTask: Task) {
    console.log(newTask);
  }
}
