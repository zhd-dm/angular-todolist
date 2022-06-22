// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isPhone: Boolean = false;

  currentUser: any = this.authSersice.checkAuth();

  constructor(
    // private responsive: BreakpointObserver,
    private authSersice: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    // this.responsive.observe(Breakpoints.HandsetPortrait)
    //   .subscribe(result => {
    //     this.isPhone = false;
    //     if(result.matches) {
    //       this.isPhone = true;
    //     }
    //   })
  }

  isAuth() {
    if (!this.currentUser || this.currentUser.length === 0 || this.currentUser === "") {
        return false;
    } else {
        return true;
    }
  }

  exit() {
    this.router.navigate(['auth/login']);
    return this.authSersice.exitUser();
  }

}
