import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private tasker: TaskService

  ) {}

  displayedColumns: string[] = ['id', 'name', 'deadline', 'priority', 'category', 'settings'];
  tasks = new MatTableDataSource(this.tasker.getTasks());

  refreshTasks$ = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {

  }

  @ViewChild(MatTable) private tasksTable: MatTable<ITask> | undefined;
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

  openModalEdit(row: any) {
    let modalEdit = this.dialogRef.open(EditTaskComponent, { data: row });
    modalEdit.afterClosed().subscribe(editTask => { // editTask - объект, который пришел из функции updateTask()
      this.tasksTable?.renderRows();
      // но что дальше я не знаю, уже многое перепробовал
    });
  }

  openModalDelete(row: any) {
    let modalDelete = this.dialogRef.open(DeleteTaskComponent, { data: row });
    modalDelete.afterClosed().subscribe(allTasks => {
      this.tasksTable?.renderRows();
    });
  }
}
