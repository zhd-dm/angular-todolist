import { Component, ViewChild, AfterViewInit, OnInit, Input, DoCheck } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/types';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, AfterViewInit, DoCheck {

  @Input()
  tasks: ITask[] = [];
  table: any;                 // ?????

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private tasker: TaskService,
    // private changeDetRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tasks = this.tasker.getTasks();
    this.table = new MatTableDataSource(this.tasks);
  }

  ngDoCheck(): void {
    // this.updateTable()
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
      this.updateTable();
    });
  }

  openModalDelete(row: any) {
    let modalDelete = this.dialogRef.open(DeleteTaskComponent, { data: row });
    modalDelete.afterClosed().subscribe(allTasks => {
      this.updateTable();
    });
  }

  updateTable() {
    this.table = new MatTableDataSource(this.tasker.getTasks());
    this.table.sort = <MatSort>this.sort;
    this.tasksTable?.renderRows();
  }
}
