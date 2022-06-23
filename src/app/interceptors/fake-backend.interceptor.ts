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
    return next.handle(request);
  }

  private getUsers(): Observable<HttpEvent<IUser[]>> {
    return of(
      new HttpResponse<IUser[]>({status: 200, body: []})
    )
  }

  private saveUser(user: IUser): Observable<HttpEvent<IUser>> {
    return of(
      new HttpResponse<IUser>({status: 200, body: {email: user.email, password: user.password}})
    )
  }

  private getTasks(): Observable<HttpEvent<ITask[]>> {
    return of(
      new HttpResponse<ITask[]>({status: 200, body: []})
    )
  }

  private getCategories(): Observable<HttpEvent<ICategory[]>> {
    return of(
      new HttpResponse<ICategory[]>({status: 200, body: []})
    )
  }

}
