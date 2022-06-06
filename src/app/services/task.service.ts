import { Injectable } from '@angular/core';

import { ITask } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(tasks: ITask[]) {
    tasks = JSON.parse(localStorage.getItem('Tasks') || 'Empty tasks list');
  }

  updateTask(task: ITask) {

  }

  saveTask(newTask: ITask) {
    console.log(newTask);
  }
}
