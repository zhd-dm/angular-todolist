import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedCategoryData: any,
    private categoer: CategoryService
  ) { }

  id!: number;

  ngOnInit(): void {
    if(this.deletedCategoryData) {
      this.id = this.deletedCategoryData.id
    }
  }

  deleteCategory(): void {
    this.categoer.deleteCategory(this.id);
    this.dialogRef.close(this.categoer.getCategories());
  }
}
