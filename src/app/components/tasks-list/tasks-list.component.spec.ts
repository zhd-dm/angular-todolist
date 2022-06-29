import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { By } from '@angular/platform-browser';

import { TasksListComponent } from './tasks-list.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, MatSortModule],
      declarations: [TasksListComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Проверка работоспособности getTasks()', () => {
    expect(component.getTasks).toBeTruthy();
  });

  it('Вызов метода getTasks() 1 раз', () => {
    spyOn(component, 'getTasks').and.callThrough();
    component.getTasks();
    expect(component.getTasks).toHaveBeenCalledTimes(1);
  });

});
