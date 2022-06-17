import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { IUser, IValidate } from 'src/types';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm = new FormGroup ({
    usernameFormControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  });

  constructor(
    private logger: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  registration() {
    let userData: IUser = {
      name: this.registrationForm.value.usernameFormControl,
      email: this.registrationForm.value.emailFormControl,
      password: this.registrationForm.value.passwordFormControl
    };
    console.log('Send to check: ', userData)

    let isValidate: IValidate = this.logger.saveUser(userData);

    if(isValidate.status) {
      console.log(isValidate.message);
      this.router.navigate(['home']);
    }
    if(!isValidate.status) {
      console.error(isValidate.message);
    }
  }
}
