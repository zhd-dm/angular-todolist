import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/types';

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
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    private categoer: CategoryService
  ) { }

  newCategory: ICategory = {
    id: this.categoer.setId(),
    name: ''
  }

  ngOnInit(): void {
    this.categories = this.categoer.getCategories();
  }

  createCategory(): void {
    this.newCategory.name = this.createCategoryForm.value.categoryNameFormControl;
    this.categoer.saveCategory(this.newCategory);
    this.dialogRef.close();
  }

  updateCategory() {
    console.log('update')
  }

}
