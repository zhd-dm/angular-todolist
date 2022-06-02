import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>
  ) { }

  ngOnInit(): void {
  }

  createTask(): void {
    this.dialogRef.close();
  }
}
