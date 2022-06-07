import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "src/types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  saveUser(user: IUser): any {
    let users: IUser[] = [];

    let storage: IUser[];

    if(!localStorage.getItem('Users')) {
      users.push(user);
      localStorage.setItem('Users', JSON.stringify(users));
    } else {
      storage = JSON.parse(localStorage.getItem('Users') || 'Empty users store');
      for(let i = 0; i < storage.length; i++) {
        users.push(storage[i]);
      }
      users.push(user);
      localStorage.setItem('Users', JSON.stringify(users));
      console.log(users);
    }
  }

  checkUser(user: IUser) {
    let storage: IUser[] = [];
    storage = JSON.parse(localStorage.getItem('Users') || 'Empty users store');
    for(let i = 0; i < storage.length; i++) {
      if(user.email == storage[i].email && user.password == storage[i].password) {
        console.log('Login success');
        return localStorage.setItem('loggedIn', 'true');
      }
    }
    return console.log('User not found!');
  }

  setId() {
    let id: number = Date.now();
    return id;
  }

  getId() {
    let id: number = Date.now();
    return id;
  }

  checkAuth() {
    if(!localStorage.getItem('loggedIn')) {
      return localStorage.setItem('loggedIn', 'false')
    }
    return localStorage.getItem('loggedIn');
  }

  exitUser() {
    return localStorage.setItem('loggedIn', 'false');
  }
}
