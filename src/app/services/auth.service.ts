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
      localStorage.setItem('Users', JSON.stringify([]))
    }
    storage = JSON.parse(localStorage.getItem('Users') || 'Empty users store');
    for(let i = 0; i < storage.length; i++) {
      if(user.email == storage[i].email) {
        return console.error('Email busy');
      }
    }
    user.email = user.email.toLowerCase();
    storage.push(user);
    localStorage.setItem('loggedIn', 'admin@mail');
    return localStorage.setItem('Users', JSON.stringify(storage));
  }

  checkUser(user: IUser) {
    let storage: IUser[] = [];
    storage = JSON.parse(localStorage.getItem('Users') || 'Empty users store');
    for(let i = 0; i < storage.length; i++) {
      if(user.email.toLowerCase() == storage[i].email && user.password == storage[i].password) {
        console.log('Login success');
        return localStorage.setItem('loggedIn', 'true');
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
      return localStorage.setItem('loggedIn', 'false')
    }
    return Boolean(localStorage.getItem('loggedIn'));
  }

  exitUser() {
    return localStorage.setItem('loggedIn', 'false');
  }
}
