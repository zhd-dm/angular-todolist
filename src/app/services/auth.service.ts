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
    let storage: IUser[];

    if(!localStorage.getItem('Users')) {
      storage = JSON.parse(localStorage.getItem('Users') || 'Empty users store')
      for (let i = 0; i < storage.length; i++) {
        if(storage[i].email == user.email && storage[i].password == user.password) {
          return localStorage.setItem('isLoggedIn', 'true');
        }
      }
    }
  }
}
