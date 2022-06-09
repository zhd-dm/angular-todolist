import { Injectable } from '@angular/core';

import { ITask } from 'src/types';

import { DATA } from "../../data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks() {
    if(!localStorage.getItem('Tasks') || JSON.parse(localStorage.getItem('Tasks')!).length === 0) {
      localStorage.setItem('Tasks', JSON.stringify(DATA))
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
        storage[i].name = task.name;
        storage[i].deadline = task.deadline;
        storage[i].category = task.category;
        storage[i].priority = task.priority;
      }
    }
    return localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  saveTask(newTask: ITask) {
    let storage: ITask[] = [];
    if(!localStorage.getItem('Tasks')) {
      localStorage.setItem('Categories', JSON.stringify([{id: 0, name: 'Test Task', deadline: 0}]))
    }
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
