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

  categoryForm: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public editedCategoryData: ICategory,
    private categoryService: CategoryService
  ) { }

  editedCategory: ICategory = {
    id: 0,
    name: ''
  }

  ngOnInit(): void {
    if(this.editedCategoryData) {
      this.categoryForm = new FormGroup ({
        id: new FormControl (this.editedCategoryData.id),
        name: new FormControl (this.editedCategoryData.name, [Validators.required, Validators.minLength(3)])
      });
      console.log('Old data: ', this.editedCategoryData);
    }
  }

  updateCategory(): void {
    this.editedCategory = this.categoryForm.value;
    console.log('Send to save: ', this.editedCategory);

    this.categoryService.updateCategory(this.editedCategory);
    this.dialogRef.close(this.editedCategory);
  }

}
