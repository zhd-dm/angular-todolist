import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICategory, ITask, IUser, IValidate } from 'src/types';
import { authURL, CATEGORIES, categoryURL, TASKS, taskURL } from 'src/data';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log(request.url);
    // console.error(request.body)

    if(request.url.indexOf('auth') >= 0) {
      if(request.url.includes(authURL)) {
        switch(request.method) {
          case 'GET': return this.getUsers(request.body);
          case 'POST': return this.saveUser(request.body);
        }
      }
    }

    if(request.url.indexOf('tasks') >= 0) {
      if(request.url.includes(taskURL)) {
        switch(request.method) {
          case 'GET': return this.getTasks();
          case 'POST': return this.saveTask(request.body);
        }
      }

      if(request.url.includes(taskURL + ':' + request.body.id)) {
        switch(request.method) {
          case 'PUT': return this.editTask(request.body);
          case 'DELETE': return this.deleteTask(request.body.id);
        }
      }
    }

    if(request.url.indexOf('categories') >= 0) {
      if(request.url.includes(categoryURL)) {
        switch(request.method) {
          case 'GET': return this.getCategories();
          case 'POST': return this.saveCategory(request.body);
        }
      }

      if(request.url.includes(categoryURL + ':' + request.body.id)) {
        switch(request.method) {
          case 'PUT': return this.editCategory(request.body);
          case 'DELETE': return this.deleteCategory(request.body.id);
        }
      }
    }

    return next.handle(request);
  }

  private getUsers(user: IUser): Observable<HttpEvent<IValidate>> {

    const isValidate: IValidate = this.checkUser(user);

    return of(
      new HttpResponse<IValidate>({status: 200, body: isValidate})
    )
  }

  private saveUser(user: IUser): Observable<HttpEvent<IUser>> {
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
    // const storage: ITask[] = JSON.parse(localStorage.getItem('Tasks')!);

    // for(let i = 0; i < storage.length; i++) {
    //   if(id === storage[i].id) {
    //     storage.splice(i, 1);
    //   }
    // }

    // localStorage.setItem('Tasks', JSON.stringify(storage));

    return of(
      new HttpResponse<number>({status: 200})
    )
  }

  private getCategories(): Observable<HttpEvent<ICategory[]>> {
    const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);

    return of(
      new HttpResponse<ICategory[]>({status: 200, body: storage})
    )
  }

  private saveCategory(newCategory: ICategory): Observable<HttpEvent<IValidate>> {

    const isValidate: IValidate = this.checkCategory(newCategory.name);

    if(isValidate.status){
      const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
      storage.push(newCategory);
      localStorage.setItem('Categories', JSON.stringify(storage));
    }

    return of(
      new HttpResponse<IValidate>({status: 200, body: isValidate})
    )
  }

  private editCategory(category: ICategory): Observable<HttpEvent<IValidate>> {

    const isValidate: IValidate = this.checkCategory(category.name);

    if(isValidate.status) {
      const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);

      for(let i = 0; i < storage.length; i++) {
        if(category.id === storage[i].id) {
          storage[i].name = category.name;
        }
      }
      localStorage.setItem('Categories', JSON.stringify(storage));
    }

    return of(
      new HttpResponse<IValidate>({status: 200, body: isValidate})
    )
  }

  protected checkCategory(name: string): IValidate {
    if(!localStorage.getItem('Categories')) {
      localStorage.setItem('Categories', JSON.stringify(CATEGORIES));
    }

    const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(name === storage[i].name) return {status: false, message: 'Category name is busy!'};
    }

    return {status: true, message: 'Successful category creation'};
  }

  protected checkUser(user: IUser): IValidate {
    if(!localStorage.getItem('Users')) {
      localStorage.setItem('Users', JSON.stringify([]));
    }

    const storage: IUser[] = JSON.parse(localStorage.getItem('Users')!);

    for(let i = 0; i < storage.length; i++) {
      if(user.email.toLowerCase() === storage[i].email && user.password === storage[i].password) {
        localStorage.setItem('loggedIn', JSON.stringify(user.email.toLowerCase()));
        return {status: true, message: 'Login success'};
      }
    }

    return {status: false, message: 'User not found!'};
  }

  private deleteCategory(id: number): Observable<HttpEvent<number>> {
    return of(
      new HttpResponse<number>({status: 200})
    )
  }

}
