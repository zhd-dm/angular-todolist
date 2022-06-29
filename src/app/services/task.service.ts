import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ITask } from 'src/types';

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

  deleteTask(task: any): void {
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);

    for(let i = 0; i < storage.length; i++) {
      if(task.id === storage[i].id) {
        storage.splice(i, 1);
      }
    }

    localStorage.setItem('Tasks', JSON.stringify(storage));
    // return this.http.delete<ITask>(this.URL + ':' + task.id, task);
  }

  setId(): number {
    return Date.now();
  }
}
