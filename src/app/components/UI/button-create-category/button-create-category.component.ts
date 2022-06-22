import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../../create-category/create-category.component';

@Component({
  selector: 'app-button-create-category',
  templateUrl: './button-create-category.component.html',
  styleUrls: ['./button-create-category.component.scss']
})
export class ButtonCreateCategoryComponent {

  constructor(public dialogRef: MatDialog) { }

  openModalCreate(): void {
    this.dialogRef.open(CreateCategoryComponent)
  }

}
