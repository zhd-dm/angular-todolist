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
    let currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    storage = storage.filter(task => task.owner === currentUser || task.owner === "");
    return storage;
  }

  updateTask(task: ITask) {
    let storage: ITask[] = [];
    let currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    for(let i = 0; i < storage.length; i++) {
      if(task.id == storage[i].id) {
        storage[i] = task;
        storage[i].owner = currentUser;
      }
    }
    return localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  saveTask(newTask: ITask) {
    let storage: ITask[] = [];
    let currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);
    storage = JSON.parse(localStorage.getItem('Tasks')!);
    newTask.owner = currentUser;
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
