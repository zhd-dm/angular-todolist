import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/types';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedTaskData: ITask,
    private taskService: TaskService
  ) { }

  task = { id: 0 };

  ngOnInit(): void {
    if(this.deletedTaskData) {
      this.task.id = this.deletedTaskData.id;
    }
  }

  deleteTask(): void {
    console.log('Send to delete: ', this.task);

    this.taskService.deleteTask(this.task);
    this.dialogRef.close(this.taskService.getTasks());
  }
}
