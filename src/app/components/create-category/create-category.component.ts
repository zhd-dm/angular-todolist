import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  createCategoryForm = new FormGroup ({
    categoryNameFormControl: new FormControl('', [Validators.required, Validators.minLength(3)])
  })


  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>
  ) { }

  ngOnInit(): void {
  }

  createCategory(): void {
    this.dialogRef.close();
  }

}
