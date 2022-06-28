import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory, IValidate } from 'src/types';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {

  createCategoryForm = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  categories: Observable<ICategory[]> = this.categoryService.getCategories();

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    private categoryService: CategoryService
  ) { }

  newCategory: ICategory = {
    id: 0,
    name: ''
  }

  createCategory(): void {
    this.newCategory = this.createCategoryForm.value;
    this.newCategory.id = this.categoryService.setId();

    console.log('Send to check: ', this.newCategory);

    const isValidate: Observable<IValidate> = this.categoryService.saveCategory(this.newCategory);

    isValidate.subscribe({
      next: response => {
        if(response.status) {
          console.log(response.message);
          this.dialogRef.close();
        }
        if(!response.status) console.error(response.message);
      },
      error: error => console.error(error)
    })
  }

  goToCategories(): void {
    this.router.navigate(['categories']);
    this.dialogRef.close();
  }
}
