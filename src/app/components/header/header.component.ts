import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any = this.logger.checkAuth();

  constructor(
    private logger: AuthService,
    private router: Router
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
    this.router.navigate(['login']);
    return this.logger.exitUser();
  }

}
