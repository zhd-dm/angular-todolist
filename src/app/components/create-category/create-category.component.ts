import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory, IValidate } from 'src/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {

  createCategoryForm = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  categories: ICategory[] = this.categoryService.getCategories();

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

    const isValidate: IValidate = this.categoryService.saveCategory(this.newCategory);

    if(isValidate.status) {
      console.log(isValidate.message);
      this.dialogRef.close();
    }
    if(!isValidate.status) {
      console.error(isValidate.message);
    }
  }

  goToCategories(): void {
    this.router.navigate(['home/categories']);
    this.dialogRef.close();
  }

}
