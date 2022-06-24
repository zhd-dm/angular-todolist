import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/types';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent implements AfterViewInit {

  categories: ICategory[] = this.categoryServise.getCategories();
  table: MatTableDataSource<ICategory> = new MatTableDataSource(this.categories);

  displayedColumns: string[] = ['id', 'name', 'settings'];

  constructor(
    private changeDetRef: ChangeDetectorRef,
    private dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private categoryServise: CategoryService
  ) { }

  @ViewChild(MatTable) private categoriesTable: MatTable<ICategory> | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngAfterViewInit(): void {
    this.table.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if(sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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
