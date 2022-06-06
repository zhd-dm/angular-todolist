import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/types';

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

  user: IUser = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private auth: AuthService){ }

  ngOnInit(): void {
  }

  registration() {
    this.user.name = this.registrationForm.value.usernameFormControl;
    this.user.email = this.registrationForm.value.emailFormControl;
    this.user.password = this.registrationForm.value.passwordFormControl;

    this.auth.saveUser(this.user);
  }


}
