import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
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
export class CategoriesListComponent implements OnInit, AfterViewInit {

  dataSource!: MatTableDataSource<ICategory>;

  displayedColumns: string[] = ['id', 'name', 'settings'];

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(
    private changeDetRef: ChangeDetectorRef,
    private dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private categoryServise: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getCategories(): void {
    this.categoryServise.getCategories()
      .subscribe({
        next: categories => {
          this.dataSource = new MatTableDataSource(categories);
          this.dataSource.sort = this.sort;
        },
        error: error => console.error(error)
      })
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
    this.getCategories();
    this.dataSource.sort = <MatSort>this.sort;
  }
}
