import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/types';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {

  categories: ICategory[] = this.categoryServise.getCategories();
  table = new MatTableDataSource(this.categories);

  constructor(
    private dialogRef: MatDialog,
    private categoryServise: CategoryService
  ) { }

  displayedColumns: string[] = ['id', 'name', 'settings'];

  @ViewChild(MatTable) private categoriesTable: MatTable<ICategory> | undefined;

  openModalEdit(row: ICategory): void {
    const modalEdit = this.dialogRef.open(EditCategoryComponent, { data: row });
    modalEdit.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  openModalDelete(row: ICategory): void {
    const modalDelete = this.dialogRef.open(DeleteCategoryComponent, { data: row });
    modalDelete.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  updateTable(): void {
    this.table = new MatTableDataSource(this.categoryServise.getCategories());
    this.categoriesTable?.renderRows();
  }
}
