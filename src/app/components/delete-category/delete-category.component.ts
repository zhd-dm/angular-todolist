import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/types';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  id!: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedCategoryData: ICategory,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    if(this.deletedCategoryData) {
      this.id = this.deletedCategoryData.id
    }
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.id);
    this.dialogRef.close(this.categoryService.getCategories());
  }
}
