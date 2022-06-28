import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CATEGORIES } from 'src/data';

import { ICategory, IValidate } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL = 'http://api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.URL);
  }

  updateCategory(category: ICategory): void {
    const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(category.id === storage[i].id) {
        storage[i].name = category.name;
      }
    }

    localStorage.setItem('Categories', JSON.stringify(storage));
  }

  saveCategory(newCategory: ICategory): Observable<IValidate> {
    // const isValidate: IValidate = this.checkCategory(newCategory.name);

    // if(isValidate.status){
    //   const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
    //   storage.push(newCategory);
    //   localStorage.setItem('Categories', JSON.stringify(storage));
    //   return isValidate;
    // }

    // return isValidate;
    return this.http.post<IValidate>(this.URL, newCategory);
  }

  deleteCategory(id: number): void {
    const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
    for(let i = 0; i < storage.length; i++) {
      if(id === storage[i].id) {
        storage.splice(i, 1);
      }
    }

    localStorage.setItem('Categories', JSON.stringify(storage));
  }

  setId(): number {
    return Date.now();
  }

  // protected checkCategory(name: string): IValidate {
  //   if(!localStorage.getItem('Categories')) {
  //     localStorage.setItem('Categories', JSON.stringify(CATEGORIES));
  //   }

  //   const storage: ICategory[] = JSON.parse(localStorage.getItem('Categories')!);
  //   for(let i = 0; i < storage.length; i++) {
  //     if(name === storage[i].name) return {status: false, message: 'Category name is busy!'};
  //   }

  //   return {status: true, message: 'Success'};
  // }

}
