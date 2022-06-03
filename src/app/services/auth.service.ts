import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  registration(user: User): any {
    let users = [];
    let storage = localStorage.getItem('Users');
    users.push(JSON.stringify(storage));

    console.log('Storage ', storage);
    console.log('Users ', users);

    if(users.length > 0) {
      users.push(user);
      localStorage.setItem('Users', JSON.stringify(users));
      console.log('New User ', user);
    }
    // return (
    //   // localStorage.setItem('Users', JSON.stringify(user))
    //   console.log(localStorage.getItem('Users'))
    // )

  }

  logIn(user: User) {

  }
}
