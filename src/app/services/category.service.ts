import { Injectable } from '@angular/core';

import { CATEGORIES } from 'src/data';

import { ICategory, IValidate } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): ICategory[] {
    let storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
    return storage;
  }

  updateCategory(category: ICategory): void {
    let storage: ICategory[] = [];
    storage = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(category.id == storage[i].id) {
        storage[i].name = category.name;
      }
    }
    localStorage.setItem('Categories', JSON.stringify(storage));
  }

  saveCategory(newCategory: ICategory): IValidate {
    let isValidate: IValidate = this.checkCategory(newCategory.name);

    if(isValidate.status){
      let storage: ICategory[] = [];
      storage = JSON.parse(localStorage.getItem('Categories')!);
      storage.push(newCategory);
      localStorage.setItem('Categories', JSON.stringify(storage));
      return isValidate;
    } else {
      return isValidate;
    }
  }

  deleteCategory(id: number): void {
    let storage: ICategory[] = [];
    storage = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(id == storage[i].id) {
        storage.splice(i, 1);
      }
    }
    localStorage.setItem('Categories', JSON.stringify(storage));
  }

  checkCategory(name: string): IValidate {
    let storage: ICategory[] = [];
    if(!localStorage.getItem('Categories')) {
      localStorage.setItem('Categories', JSON.stringify(CATEGORIES));
    }
    storage = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(name === storage[i].name) return {status: false, message: 'Category name is busy!'};
    }
    return {status: true, message: 'Success'};
  }

  setId(): number {
    let id: number = Date.now();
    return id;
  }
}
