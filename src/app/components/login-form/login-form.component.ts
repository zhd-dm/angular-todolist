import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser, IValidate } from 'src/types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  isPhone: Boolean = false;
  isValidate: IValidate = {status: false, message: ''};

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)])
  })

  constructor(
    private changeDetRef: ChangeDetectorRef,
    private responsive: BreakpointObserver,
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

    this.isValidate = this.authService.checkUser(userData);

    if(this.isValidate.status) {
      this.router.navigate(['home']);
    }
  }
}
