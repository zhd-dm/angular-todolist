// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isPhone: Boolean = false;

  currentUser: string = this.authSersice.checkAuth();

  constructor(
    private authSersice: AuthService,
    private router: Router
  ){}

  isAuth(): boolean {
    if (!this.currentUser || this.currentUser.length === 0 || this.currentUser === "") {
        return false;
    } else {
        return true;
    }
  }

  exit(): void {
    this.router.navigate(['auth/login']);
    return this.authSersice.exitUser();
  }

}
