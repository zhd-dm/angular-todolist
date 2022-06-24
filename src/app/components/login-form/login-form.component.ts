import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { IUser, IValidate } from 'src/types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  isPhone: Boolean = false;

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)])
  })

  constructor(
    private changeDetRef: ChangeDetectorRef,
    private responsive: BreakpointObserver,
    // private responsiveService: ResponsiveService,
    private authService: AuthService,
    private router: Router
  ){}

  userData: IUser = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait)
    .subscribe(result => {
      this.isPhone = false;
      if(result.matches) {
        this.isPhone = true;
      }
    });
  }

  logIn(): void {
    const userData: IUser = this.loginForm.value;
    console.log('Send to check: ', userData);

    const isValidate: IValidate = this.authService.checkUser(userData);

    if(isValidate.status) {
      console.log(isValidate.message);
      this.router.navigate(['home']);
    }
    if(!isValidate.status) {
      console.error(isValidate.message);
    }
  }
}
