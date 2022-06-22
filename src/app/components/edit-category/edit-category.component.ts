import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/types';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm = new FormGroup({
    categoryIdFormControl: new FormControl(''),
    categoryNameFormControl: new FormControl('')
  })

  constructor(
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public editedCategoryData: any,
    private categoryService: CategoryService
  ) { }

  editedCategory: ICategory = {
    id: 0,
    name: ''
  }

  ngOnInit(): void {
    if(this.editedCategoryData) {
      this.categoryForm.controls['categoryIdFormControl'].setValue(this.editedCategoryData.id);
      this.categoryForm.controls['categoryNameFormControl'].setValue(this.editedCategoryData.name);
      console.log('Old data: ', this.editedCategoryData);
    }
  }

  updateCategory() {
    this.editedCategory.id = this.categoryForm.value.categoryIdFormControl;
    this.editedCategory.name = this.categoryForm.value.categoryNameFormControl;
    console.log('Send to save: ', this.editedCategory);

    this.categoryService.updateCategory(this.editedCategory);
    this.dialogRef.close(this.editedCategory);
  }

}
