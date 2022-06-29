import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, MatSortModule],
      declarations: [CategoriesListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Проверка работоспособности getCategories()', () => {
    expect(component.getCategories).toBeTruthy();
  });

  it('Вызов метода getCategories() 1 раз', () => {
    spyOn(component, 'getCategories').and.callThrough();
    component.getCategories();
    expect(component.getCategories).toHaveBeenCalledTimes(1);
  });

});
