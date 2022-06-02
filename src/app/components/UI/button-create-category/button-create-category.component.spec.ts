import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCreateCategoryComponent } from './button-create-category.component';

describe('ButtonCreateCategoryComponent', () => {
  let component: ButtonCreateCategoryComponent;
  let fixture: ComponentFixture<ButtonCreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCreateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
