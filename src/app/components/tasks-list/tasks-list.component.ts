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

  // tasks: Observable<ITask[]> = this.taskService.getTasks();
  // table: Observable<MatTableDataSource<ITask[]>> = new MatTableDataSource(this.tasks);

  dataSource = new MatTableDataSource<ITask>();

  displayedColumns: string[] = ['id', 'name', 'deadline', 'priority', 'category', 'settings'];

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private taskService: TaskService,
    private changeDetRef: ChangeDetectorRef
  ) {}

  @ViewChild(MatTable) private tasksTable: MatTable<ITask> | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.updateTable();
  }

  ngAfterViewInit(): void {
    // this.table.sort = this.sort;
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(res => {
        this.dataSource.data = res;
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
    // this.table = new MatTableDataSource(this.taskService.getTasks());
    // this.table.sort = <MatSort>this.sort;

    // Обновляет не сразу, а после нескольких mousemove'ов
    // this.changeDetRef.checkNoChanges();
    this.tasksTable?.renderRows();
  }

}
