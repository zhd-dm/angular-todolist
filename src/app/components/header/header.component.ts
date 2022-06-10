import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // res: Boolean = <Boolean>this.logger.checkAuth();
  currentUser: string = this.logger.checkAuth();

  constructor(
    private logger: AuthService
  ){}

  ngOnInit(): void {

  }

  isAuth() {
    if (!this.currentUser || this.currentUser.length === 0 || this.currentUser === "") {
        return false;
    } else {
        return true;
    }
  }

  exit() {
    return this.logger.exitUser();
  }

}
