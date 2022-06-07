import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/types';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  updateCategoryForm = new FormGroup ({
    categoryIdFormControl: new FormControl(''),
    categoryNameFormControl: new FormControl('', [Validators.minLength(3)])
  })

  constructor(
    private categoer: CategoryService
  ) { }

  updatedCategory: ICategory = {
    id: 0,
    name: ''
  }

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.categories = this.categoer.getCategories();
    this.updateCategoryForm.controls['categoryIdFormControl'].setValue(this.updatedCategory.id);
  }

  updateCategory(): void {
    this.updatedCategory.id = this.updateCategoryForm.value.categoryIdFormControl;
    this.updatedCategory.name = this.updateCategoryForm.value.categoryNameFormControl;
    console.log('Updated category: ', this.updatedCategory)
    // this.categoer.updateCategory(this.updatedCategory);
  }

}
