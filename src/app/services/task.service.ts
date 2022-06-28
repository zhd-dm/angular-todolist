import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ITask } from 'src/types';

import { TASKS } from "../../data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL = 'http://api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    // if(!localStorage.getItem('Tasks') || JSON.parse(localStorage.getItem('Tasks')!).length === 0) {
    //   localStorage.setItem('Tasks', JSON.stringify(TASKS))
    // }

    // let storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    // const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    // storage = storage.filter(task => task.owner === currentUser || task.owner === "");
    // return storage;

    return this.http.get(this.URL);
  }

  updateTask(task: ITask): void {
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    for(let i = 0; i < storage.length; i++) {
      if(task.id === storage[i].id) {
        storage[i] = task;
        storage[i].owner = currentUser;
      }
    }

    localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  saveTask(newTask: ITask): void {
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    newTask.owner = currentUser;
    storage.push(newTask);
    localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  deleteTask(id: number): void {
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    for(let i = 0; i < storage.length; i++) {
      if(id === storage[i].id) {
        storage.splice(i, 1);
      }
    }

    localStorage.setItem('Tasks', JSON.stringify(storage));
  }

  setId(): number {
    return Date.now();
  }
}
