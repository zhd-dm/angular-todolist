import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateTaskComponent } from './create-task.component';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, ReactiveFormsModule, MatSelectModule,
        MatCheckboxModule, MatInputModule, BrowserAnimationsModule
      ],
      declarations: [CreateTaskComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Форма валидна', async () => {
    component.createTaskForm.controls['name'].setValue('Create App');
    component.createTaskForm.controls['deadline'].setValue('123456');
    component.createTaskForm.controls['priority'].setValue('2022-06-22T21:00:00.000Z');
    component.createTaskForm.controls['category'].setValue('Main');
    expect(component.createTaskForm.valid).toBeTruthy();
  });

  it('Форма невалидна', async () => {
    component.createTaskForm.controls['name'].setValue('');
    component.createTaskForm.controls['deadline'].setValue('');
    component.createTaskForm.controls['priority'].setValue('');
    component.createTaskForm.controls['category'].setValue('');
    expect(component.createTaskForm.valid).toBeFalsy();
  });
});
