import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser, IValidate } from 'src/types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    emailFormControl : new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)])
  })

  constructor(
    private logger: AuthService,
    private router: Router
  ){}

  userData: IUser = {
    email: '',
    password: ''
  }

  ngOnInit(): void {

  }

  logIn() {
    this.userData.email = this.loginForm.value.emailFormControl;
    this.userData.password = this.loginForm.value.passwordFormControl;
    console.log('Send to check: ', this.userData);

    let isValidate: IValidate = this.logger.checkUser(this.userData);

    if(isValidate.status) {
      console.log(isValidate.message);
      this.router.navigate(['home']);
    }
    if(!isValidate.status) {
      console.error(isValidate.message);
    }
  }
}
