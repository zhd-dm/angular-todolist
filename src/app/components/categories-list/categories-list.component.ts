import { Component, OnInit, ViewChild } from '@angular/core';
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
export class CategoriesListComponent implements OnInit {

  categories: ICategory[] = [];
  table: any;

  constructor(
    private dialogRef: MatDialog,
    private categoryServise: CategoryService
  ) { }

  displayedColumns: string[] = ['id', 'name', 'settings'];

  ngOnInit(): void {
    this.categories = this.categoryServise.getCategories();
    this.table = new MatTableDataSource(this.categories);
  }

  @ViewChild(MatTable) private categoriesTable: MatTable<ICategory> | undefined;

  openModalEdit(row: any): void {
    let modalEdit = this.dialogRef.open(EditCategoryComponent, { data: row });
    modalEdit.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  openModalDelete(row: any): void {
    let modalDelete = this.dialogRef.open(DeleteCategoryComponent, { data: row });
    modalDelete.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  updateTable(): void {
    this.table = new MatTableDataSource(this.categoryServise.getCategories());
    this.categoriesTable?.renderRows();
  }
}
