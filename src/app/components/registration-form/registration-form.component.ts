import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { IUser, IValidate } from 'src/types';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent implements OnInit {

  isPhone: Boolean = false;
  isValidate: IValidate = {status: false, message: ''};

  registrationForm = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  });

  constructor(
    private changeDetRef: ChangeDetectorRef,
    private responsive: BreakpointObserver,
    // private responsiveService: ResponsiveService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhone = false;
        if(result.matches) {
          this.isPhone = true;
        }
      });
  }

  registration(): void {
    const userData: IUser = this.registrationForm.value;
    console.log('Send to check: ', userData)

    this.isValidate = this.authService.saveUser(userData);

    if(this.isValidate.status) {
      this.router.navigate(['home']);
    }
  }
}
