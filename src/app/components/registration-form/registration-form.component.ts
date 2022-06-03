import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm = new FormGroup ({
    usernameFormControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    confirmPasswordFormControl: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  })



  ngOnInit(): void {
  }

  registration() {
    console.log(this.registrationForm.value)
  }


}
