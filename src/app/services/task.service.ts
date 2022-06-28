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

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.URL);
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.URL + ':' + task.id, task);
  }

  saveTask(newTask: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.URL, newTask);
  }

  deleteTask(task: any): Observable<any> {
    debugger
    return this.http.delete<number>(this.URL + ':' + task.id);
  }

  setId(): number {
    return Date.now();
  }
}
