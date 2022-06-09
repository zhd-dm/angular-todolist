import { Injectable } from '@angular/core';

import { ITask } from 'src/types';

import { TASKS } from "../../data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks() {
    if(!localStorage.getItem('Tasks') || JSON.parse(localStorage.getItem('Tasks')!).length === 0) {
      localStorage.setItem('Tasks', JSON.stringify(TASKS))
    }
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    return storage;
  }

  updateTask(task: ITask) {
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    for(let i = 0; i < storage.length; i++) {
      if(task.id == storage[i].id) {
        storage[i] = task;
      }
    }
    return localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  saveTask(newTask: ITask) {
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    storage.push(newTask);
    return localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  deleteTask(id: number) {
    let storage: ITask[] = [];
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    for(let i = 0; i < storage.length; i++) {
      if(id == storage[i].id) {
        storage.splice(i, 1);
      }
    }
    return localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  setId() {
    let id: number = Date.now();
    return id;
  }
}
