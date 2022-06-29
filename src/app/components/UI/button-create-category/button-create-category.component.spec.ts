import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ButtonCreateCategoryComponent } from './button-create-category.component';

describe('ButtonCreateCategoryComponent', () => {
  let component: ButtonCreateCategoryComponent;
  let fixture: ComponentFixture<ButtonCreateCategoryComponent>;

  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ButtonCreateCategoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('openModalCreate()', () => {
    expect(component.openModalCreate).toBeTruthy();
  });

  it('Вызов модального окна', () => {
    spyOn(component, 'openModalCreate');
    button = fixture.debugElement.query(By.css('.btn-create')).nativeElement;
    button.click();
    expect(component.openModalCreate).toHaveBeenCalledTimes(1);
  });
});
