import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public deletedTaskData: any,
    private tasker: TaskService
  ) { }

  id!: number;

  ngOnInit(): void {
    if(this.deletedTaskData) {
      this.id = this.deletedTaskData.id
    }
  }

  deleteTask(): void {
    this.tasker.deleteTask(this.id);
    this.dialogRef.close();
  }

}
