import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [RegistrationFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Пока не знаю как обработать вызов к сервису
  // it('should set submitted to true', async () => {
  //   component.registration();
  //   expect(component.isValidate.status).toBeTruthy();
  // });

  it('form should be valid', async () => {
    component.registrationForm.controls['name'].setValue('demyan');
    component.registrationForm.controls['email'].setValue('demyan@mail');
    component.registrationForm.controls['password'].setValue('123456');
    expect(component.registrationForm.valid).toBeTruthy();
  });

  it('form should be invalid', async () => {
    component.registrationForm.controls['name'].setValue('');
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['password'].setValue('');
    expect(component.registrationForm.valid).toBeFalsy();
  });
});
