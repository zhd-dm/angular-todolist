import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICategory, ITask, IUser } from 'src/types';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes('/api/auth')) {
      switch(request.method) {
        case 'GET':
          return this.getUsers();
        case 'POST':
          return this.saveUser(request.body);
      }
    }

    if(request.url.includes('api/tasks')) {
      switch(request.method) {
        case 'GET':
          return this.getTasks();
        case 'POST':
          return this.saveTask(request.body);
      }
    }

    if(request.url.includes(`api/tasks:${request.body.id}`)) {
      switch(request.method) {
        case 'PATCH':
          return this.editTask(request.body);
        case 'DELETE':
          return this.deleteTask(request.body.id);
      }
    }

    if(request.url.includes('api/categories')) {
      switch(request.method) {
        case 'GET':
          return this.getCategories();
        case 'POST':
          return this.saveCategory(request.body);
      }
    }

    if(request.url.includes(`api/categories:${request.body.id}`)) {
      switch(request.method) {
        case 'PATCH':
          return this.editCategory(request.body);
        case 'DELETE':
          return this.deleteCategory(request.body.id);
      }
    }

    return next.handle(request);
  }

  private getUsers(): Observable<HttpEvent<IUser[]>> {
    return of(
      new HttpResponse<IUser[]>({status: 200, body: []})
    )
  }

  private saveUser(user: IUser): Observable<HttpEvent<IUser>> {
    return of(
      new HttpResponse<IUser>({status: 200, body: user})
    )
  }

  private getTasks(): Observable<HttpEvent<ITask[]>> {
    return of(
      new HttpResponse<ITask[]>({status: 200, body: []})
    )
  }

  private saveTask(task: ITask): Observable<HttpEvent<ITask>> {
    return of(
      new HttpResponse<ITask>({status: 200, body: task})
    )
  }

  private editTask(task: ITask): Observable<HttpEvent<ITask>> {
    return of(
      new HttpResponse<ITask>({status: 200, body: task})
    )
  }

  private deleteTask(id: number): Observable<HttpEvent<number>> {
    return of(
      new HttpResponse<number>({status: 200})
    )
  }

  private getCategories(): Observable<HttpEvent<ICategory[]>> {
    return of(
      new HttpResponse<ICategory[]>({status: 200, body: []})
    )
  }

  private saveCategory(category: ICategory): Observable<HttpEvent<ICategory>> {
    return of(
      new HttpResponse<ICategory>({status: 200, body: category})
    )
  }

  private editCategory(category: ICategory): Observable<HttpEvent<ICategory>> {
    return of(
      new HttpResponse<ICategory>({status: 200, body: category})
    )
  }

  private deleteCategory(id: number): Observable<HttpEvent<number>> {
    return of(
      new HttpResponse<number>({status: 200})
    )
  }

}
