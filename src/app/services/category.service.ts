import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  updateCategory(category: ICategory): Observable<IValidate> {
    return this.http.put<IValidate>(this.URL, category);
  }

  saveCategory(newCategory: ICategory): Observable<IValidate> {
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

}
