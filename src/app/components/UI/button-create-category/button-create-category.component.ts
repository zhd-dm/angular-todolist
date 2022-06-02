import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../create-category/create-category.component';

@Component({
  selector: 'app-button-create-category',
  templateUrl: './button-create-category.component.html',
  styleUrls: ['./button-create-category.component.scss']
})
export class ButtonCreateCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  openModalCreate() {
    this.dialogRef.open(CreateCategoryComponent)
  }

}
