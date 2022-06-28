import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ITask } from 'src/types';

import { TASKS } from "../../data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL = 'http://api/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.URL);
  }

  updateTask(task: ITask): Observable<ITask> {
    // const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    // const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    // for(let i = 0; i < storage.length; i++) {
    //   if(task.id === storage[i].id) {
    //     storage[i] = task;
    //     storage[i].owner = currentUser;
    //   }
    // }

    // localStorage.setItem('Tasks', JSON.stringify(storage));
    return this.http.put<ITask>(this.URL + ':' + task.id, task);
  }

  saveTask(newTask: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.URL, newTask);
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
