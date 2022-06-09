import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BehaviorSubject } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

import { DATA } from '../../../data';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/types';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private tasker: TaskService

  ) {}

  tasks: ITask[] = [];
  table: any;                 // ?????

  ngOnChanges(): void {
    console.error('ngOnChanges')
  }

  ngOnInit(): void {
    this.tasks = this.tasker.getTasks();
    this.table = new MatTableDataSource(this.tasks);
  }

  ngAfterViewInit() {
    this.table.sort = this.sort;
  }

  displayedColumns: string[] = ['id', 'name', 'deadline', 'priority', 'category', 'settings'];

  @ViewChild(MatTable) private tasksTable: MatTable<ITask> | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openModalEdit(row: any) {
    let modalEdit = this.dialogRef.open(EditTaskComponent, { data: row });
    modalEdit.afterClosed().subscribe(editTask => {
      this.tasker.getTasks()
    });
  }

  openModalDelete(row: any) {
    let modalDelete = this.dialogRef.open(DeleteTaskComponent, { data: row });
    modalDelete.afterClosed().subscribe(allTasks => {
      this.tasksTable?.renderRows();
    });
  }
}
