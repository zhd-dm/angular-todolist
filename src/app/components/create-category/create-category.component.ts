import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory, IValidate } from 'src/types';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  createCategoryForm = new FormGroup ({
    categoryNameFormControl: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  updateCategoryForm = new FormGroup ({
    // categoryNameFormControl: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  categories: ICategory[] = [];

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    private categoryService: CategoryService
  ) { }

  newCategory: ICategory = {
    id: this.categoryService.setId(),
    name: ''
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  createCategory(): void {
    this.newCategory.name = this.createCategoryForm.value.categoryNameFormControl;
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
    this.router.navigate(['/home/categories']);
    this.dialogRef.close();
  }

}
