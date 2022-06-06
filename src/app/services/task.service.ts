import { Injectable } from '@angular/core';

import { ITask } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks() {
    let storage: ITask[] = [];
    if(localStorage.getItem('Tasks')) {
      return storage = JSON.parse(localStorage.getItem('Tasks') || 'Empty tasks store');
    } else {
      return console.log('Empty tasks storage')
    }
  }

  updateTask(task: ITask) {
    let tasks: ITask[] = [];
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks') || 'Empty tasks store');
    for(let i = 0; i < storage.length; i++) {
      if(task.id == storage[i].id) {
        storage[i].name = task.name;
        storage[i].deadline = task.deadline;
        storage[i].category = task.category;
        storage[i].priority = task.priority;
      }
    }
    return localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  saveTask(newTask: ITask) {
    let tasks: ITask[] = [];
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks') || 'Empty tasks store');
    tasks.push(newTask);
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    // console.log();
  }
}
