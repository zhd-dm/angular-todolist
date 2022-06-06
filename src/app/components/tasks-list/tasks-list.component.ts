import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

import { DATA } from '../../../data';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/types';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements AfterViewInit {

  // displayedColumns: string[] = ['name', 'deadline', 'priority', 'category', 'edit', 'delete'];
  // tasks = new MatTableDataSource(DATA);

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private tasker: TaskService
  ) {}

  displayedColumns: string[] = ['id', 'name', 'deadline', 'priority', 'category', 'edit', 'delete'];
  tasks = new MatTableDataSource(this.tasker.getAllTasks());

  ngOnInit(): void {
  }


  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.tasks.sort = this.sort
  }

  announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openModalEdit() {
    this.dialogRef.open(EditTaskComponent)
  }

  openModalDelete() {
    this.dialogRef.open(DeleteTaskComponent)
  }
}
