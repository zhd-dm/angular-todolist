import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteTask(): void {
    this.dialogRef.close();
  }

}