import { Injectable } from '@angular/core';

import { ITask } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getAllTasks() {
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks') || 'Empty tasks store');
    return storage;
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
    storage.push(newTask);
    localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  setId() {
    let id: number = Date.now();
    return id;
  }
}
