import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck, OnChanges, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, OnChanges, AfterViewInit {

  dataSource!: MatTableDataSource<ITask>;

  displayedColumns: string[] = ['id', 'name', 'deadline', 'priority', 'category', 'settings'];

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private taskService: TaskService,
    private changeDetRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.updateTable();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe({
        next: tasks => {
          this.dataSource = new MatTableDataSource(tasks);
          this.dataSource.sort = this.sort;
        },
        error: error => console.log(error)
      })
  }

  announceSortChange(sortState: Sort): void {
    if(sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openModalEdit(row: ITask): void {
    const modalEdit = this.dialogRef.open(EditTaskComponent, { data: row });
    modalEdit.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  openModalDelete(row: ITask): void {
    const modalDelete = this.dialogRef.open(DeleteTaskComponent, { data: row });
    modalDelete.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  updateTable(): void {
    this.getTasks();
    this.dataSource.sort = <MatSort>this.sort;
  }

}
