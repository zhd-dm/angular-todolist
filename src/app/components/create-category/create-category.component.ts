import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>
  ) { }

  ngOnInit(): void {
  }

  createCategory(): void {
    this.dialogRef.close();
  }

}
