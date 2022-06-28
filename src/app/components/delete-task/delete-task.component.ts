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

    this.taskService.deleteTask(this.task)
      .subscribe({
        next: task => this.dialogRef.close(task),
        error: error => console.error(error)
      })

    this.dialogRef.close(this.taskService.getTasks());
  }
  // updateTask(): void {
  //   this.editedTask = this.taskForm.value;
  //   console.log('Send to save: ', this.taskForm.value);

  //   this.taskService.updateTask(this.editedTask)
  //     .subscribe({
  //       next: editedTask => this.dialogRef.close(editedTask),
  //       error: error => console.error(error)
  //     })
  // }
}
