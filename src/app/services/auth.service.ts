import { Injectable } from "@angular/core";
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
        return {status: false, message: 'Email busy!'};
      }
    }
    user.email = user.email.toLowerCase();
    storage.push(user);
    localStorage.setItem('loggedIn', JSON.stringify(user.email));
    localStorage.setItem('Users', JSON.stringify(storage));
    return {status: true, message: 'Register successfully'};
  }

  checkUser(user: IUser) {
    let storage: IUser[] = [];
    if(!localStorage.getItem('Users')) {
      localStorage.setItem('Users', JSON.stringify([]));
    }
    storage = JSON.parse(localStorage.getItem('Users')!);
    for(let i = 0; i < storage.length; i++) {
      if(user.email.toLowerCase() === storage[i].email && user.password === storage[i].password) {
        localStorage.setItem('loggedIn', JSON.stringify(user.email.toLowerCase()));
        return {status: true, message: 'Login success'};
      }
    }
    return {status: false, message: 'User not found!'};
  }

  setId() {
    let id: number = Date.now();
    return id;
  }

  checkAuth() {
    let currentUser: string = JSON.parse(localStorage.getItem('loggedIn')!);
    if (!currentUser || currentUser.length === 0 || currentUser === '') {
      return localStorage.setItem('loggedIn', JSON.stringify(''));
    }
    return JSON.parse(localStorage.getItem('loggedIn')!);
  }

  exitUser() {
    return localStorage.setItem('loggedIn', JSON.stringify(''));
  }
}
