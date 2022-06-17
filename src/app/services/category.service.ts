import { Injectable } from '@angular/core';

import { CATEGORIES } from 'src/data';

import { ICategory, IValidate } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories() {
    let storage: ICategory[] = [];
    storage = JSON.parse(localStorage.getItem('Categories')!);
    return storage;
  }

  updateCategory(category: ICategory) {
    let storage: ICategory[] = [];
    storage = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(category.id == storage[i].id) {
        storage[i].name = category.name;
      }
    }
    return localStorage.setItem('Categories', JSON.stringify(storage));
  }

  saveCategory(newCategory: ICategory) {
    // let isValidate: IValidate = this.checkCategory(newCategory.name);
    // if(isValidate){}
    let storage: ICategory[] = [];
    if(!localStorage.getItem('Categories')) {
      localStorage.setItem('Categories', JSON.stringify(CATEGORIES));
    }
    storage = JSON.parse(localStorage.getItem('Categories')!);
    storage.push(newCategory);
    localStorage.setItem('Categories', JSON.stringify(storage));
  }

  deleteCategory(id: number) {
    let storage: ICategory[] = [];
    storage = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(id == storage[i].id) {
        storage.splice(i, 1);
      }
    }
    return localStorage.setItem('Categories', JSON.stringify(storage));
  }

  checkCategory(name: string) {
    let storage: ICategory[] = [];
    storage = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(name === storage[i].name) return {status: false, message: 'Category name is busy!'};
    }
    return {status: true, message: 'Success'};
  }

  setId() {
    let id: number = Date.now();
    return id;
  }
}
