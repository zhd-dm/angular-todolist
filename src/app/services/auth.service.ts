import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "src/types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  saveUser(user: IUser) {
    let storage: IUser[];
    if(!localStorage.getItem('Users')) {
      localStorage.setItem('Users', JSON.stringify([]));
    }
    storage = JSON.parse(localStorage.getItem('Users')!);
    for(let i = 0; i < storage.length; i++) {
      if(user.email === storage[i].email) {
        return console.error('Email busy');
      }
    }
    user.email = JSON.stringify(user.email.toLowerCase());
    storage.push(user);
    localStorage.setItem('loggedIn', (user.email));
    return localStorage.setItem('Users', JSON.stringify(storage));
  }

  checkUser(user: IUser) {
    let storage: IUser[] = [];
    if(!localStorage.getItem('Users')) {
      localStorage.setItem('Users', JSON.stringify([]));
    }
    storage = JSON.parse(localStorage.getItem('Users')!);
    for(let i = 0; i < storage.length; i++) {
      if(user.email.toLowerCase() === storage[i].email && user.password === storage[i].password) {
        console.log('Login success');
        return localStorage.setItem('loggedIn', JSON.stringify(user.email.toLowerCase()));
      }
    }
    return console.error('User not found!');
  }

  setId() {
    let id: number = Date.now();
    return id;
  }

  checkAuth() {
    if(!localStorage.getItem('loggedIn')) {
      return localStorage.setItem('loggedIn', '')
    }
    return JSON.parse((localStorage.getItem('loggedIn'))!);
  }

  exitUser() {
    return localStorage.setItem('loggedIn', JSON.stringify(''));
  }
}
