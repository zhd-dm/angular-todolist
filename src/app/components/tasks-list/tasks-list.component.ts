import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class TasksListComponent implements AfterViewInit {

  tasks: ITask[] = this.taskService.getTasks();
  table: MatTableDataSource<ITask> = new MatTableDataSource(this.tasks);

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private taskService: TaskService,
    // private changeDetRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.table.sort = this.sort;
  }

  displayedColumns: string[] = ['id', 'name', 'deadline', 'priority', 'category', 'settings'];

  @ViewChild(MatTable) private tasksTable: MatTable<ITask> | undefined;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

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
    this.table = new MatTableDataSource(this.taskService.getTasks());
    this.table.sort = <MatSort>this.sort;
    this.tasksTable?.renderRows();
  }

}
