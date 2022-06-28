import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICategory, ITask, IUser } from 'src/types';
import { TASKS } from 'src/data';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes('http://api/auth')) {
      switch(request.method) {
        case 'GET':
          return this.getUsers();
        case 'POST':
          return this.saveUser(request.body);
      }
    }

    if(request.url.includes('http://api/tasks')) {
      switch(request.method) {
        case 'GET':
          return this.getTasks();
        case 'POST':
          return this.saveTask(request.body);
      }
    }

    // if(request.url.includes(`http://api/tasks:${request.body.id}`)) {
    //   console.log(request.body.id)
    //   switch(request.method) {
    //     case 'PUT':
    //       debugger
    //       return this.editTask(request.body);
    //     case 'DELETE':
    //       debugger
    //       return this.deleteTask(request.body.id);
    //   }
    // }

    if(request.url.includes('http://api/categories')) {
      switch(request.method) {
        case 'GET':
          return this.getCategories();
        case 'POST':
          return this.saveCategory(request.body);
      }
    }

    if(request.url.includes(`http://api/categories:${request.body.id}`)) {
      switch(request.method) {
        case 'PATCH':
          return this.editCategory(request.body);
        case 'DELETE':
          return this.deleteCategory(request.body);
      }
    }
    return next.handle(request);
  }

  private getUsers(): Observable<HttpEvent<IUser[]>> {
    console.log('getUsers')
    return of(
      new HttpResponse<IUser[]>({status: 200, body: []})
    )
  }

  private saveUser(user: IUser): Observable<HttpEvent<IUser>> {
    console.log('saveUser')
    return of(
      new HttpResponse<IUser>({status: 200, body: user})
    )
  }

  private getTasks(): Observable<HttpEvent<ITask[]>> {
    if(!localStorage.getItem('Tasks') || JSON.parse(localStorage.getItem('Tasks')!).length === 0) {
      localStorage.setItem('Tasks', JSON.stringify(TASKS))
    }

    let storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    storage = storage.filter(task => task.owner === currentUser || task.owner === "");

    return of(
      new HttpResponse<ITask[]>({status: 200, body: storage})
    )
  }

  private saveTask(newTask: ITask): Observable<HttpEvent<ITask>> {
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    newTask.owner = currentUser;
    storage.push(newTask);
    localStorage.setItem('Tasks', JSON.stringify(storage));
    return of(
      new HttpResponse<ITask>({status: 200, body: newTask})
    )
  }

  private editTask(task: ITask): Observable<HttpEvent<ITask>> {
    console.log('editTask()');
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);
    const currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);

    for(let i = 0; i < storage.length; i++) {
      if(task.id === storage[i].id) {
        storage[i] = task;
        storage[i].owner = currentUser;
      }
    }

    localStorage.setItem('Tasks', JSON.stringify(storage));

    return of(
      new HttpResponse<ITask>({status: 200, body: task})
    )
  }

  private deleteTask(id: number): Observable<HttpEvent<number>> {
    console.log('deleteTask()');
    const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);

    for(let i = 0; i < storage.length; i++) {
      if(id === storage[i].id) {
        storage.splice(i, 1);
      }
    }

    localStorage.setItem('Tasks', JSON.stringify(storage));

    return of(
      new HttpResponse<number>({status: 200})
    )
  }

  private getCategories(): Observable<HttpEvent<ICategory[]>> {
    console.log('getCategories()');
    const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);

    return of(
      new HttpResponse<ICategory[]>({status: 200, body: storage})
    )
  }

  private saveCategory(category: ICategory): Observable<HttpEvent<ICategory>> {
    console.log('saveCategory')
    return of(
      new HttpResponse<ICategory>({status: 200, body: category})
    )
  }

  private editCategory(category: ICategory): Observable<HttpEvent<ICategory>> {
    console.log('editCategory')
    return of(
      new HttpResponse<ICategory>({status: 200, body: category})
    )
  }

  private deleteCategory(id: number): Observable<HttpEvent<number>> {
    console.log('deleteCategory')
    return of(
      new HttpResponse<number>({status: 200})
    )
  }

}
