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

  userData: IUser = {
    id: this.logger.setId(),
    name: "",
    email: "",
    password: ""
  }

  ngOnInit(): void {
  }

  registration() {
    this.userData.name = this.registrationForm.value.usernameFormControl;
    this.userData.email = this.registrationForm.value.emailFormControl;
    this.userData.password = this.registrationForm.value.passwordFormControl;

    let isValidate: IValidate = this.logger.saveUser(this.userData);

    if(isValidate.status) {
      console.log(isValidate.message);
      this.router.navigate(['home']);
    }
    if(!isValidate.status) {
      console.error(isValidate.message);
    }
  }
}
