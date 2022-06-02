import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>
    ) { }

  ngOnInit(): void {
  }

  updateTask(): void {
    this.dialogRef.close();
  }

}
