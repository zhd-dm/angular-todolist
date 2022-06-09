import { Injectable } from '@angular/core';

import { CATEGORIES } from 'src/data';

import { ICategory } from 'src/types';

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
    let storage: ICategory[] = [];
    if(!localStorage.getItem('Categories')) {
      localStorage.setItem('Categories', JSON.stringify(CATEGORIES));
    }
    storage = JSON.parse(localStorage.getItem('Categories')!);
    storage.push(newCategory);
    return localStorage.setItem('Categories', JSON.stringify(storage));
  }

  setId() {
    let id: number = Date.now();
    return id;
  }
}
