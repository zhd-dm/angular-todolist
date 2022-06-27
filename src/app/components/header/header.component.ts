import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements DoCheck, OnDestroy {

  isPhone = false;
  currentUser = '';
  isAuth = false;

  constructor(
    private changeDetRef: ChangeDetectorRef,
    private authSersice: AuthService,
    private router: Router
  ){}

  // Слишком много вызовов - переделать
  ngDoCheck(): void {
    this.isAuth = this.checkAuth();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

  checkAuth(): boolean {
    this.currentUser = this.authSersice.checkAuth();
    if (!this.currentUser || this.currentUser.length === 0 || this.currentUser === "") {
        return false;
    } else {
        return true;
    }
  }

  exit(): void {
    this.router.navigate(['auth/login']);
    this.authSersice.exitUser();
  }

}
