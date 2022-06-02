import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCreateTaskComponent } from './button-create-task.component';

describe('ButtonCreateTaskComponent', () => {
  let component: ButtonCreateTaskComponent;
  let fixture: ComponentFixture<ButtonCreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCreateTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
