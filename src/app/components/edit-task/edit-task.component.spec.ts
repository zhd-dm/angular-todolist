import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditTaskComponent } from './edit-task.component';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule, HttpClientModule, ReactiveFormsModule,
        MatSelectModule, MatInputModule, MatCheckboxModule,
        BrowserAnimationsModule
      ],
      declarations: [EditTaskComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Форма валидна', async () => {
    component.taskForm.controls['name'].setValue('Create App');
    component.taskForm.controls['deadline'].setValue('123456');
    component.taskForm.controls['priority'].setValue('2022-06-22T21:00:00.000Z');
    component.taskForm.controls['category'].setValue('Main');
    expect(component.taskForm.valid).toBeTruthy();
  });

  it('Форма невалидна', async () => {
    component.taskForm.controls['name'].setValue('');
    component.taskForm.controls['deadline'].setValue('');
    component.taskForm.controls['priority'].setValue('');
    component.taskForm.controls['category'].setValue('');
    expect(component.taskForm.valid).toBeFalsy();
  });
});
