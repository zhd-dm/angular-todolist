import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskNameFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  taskDeadlineFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>
    ) { }

  ngOnInit(): void {
  }

  updateTask(): void {
    this.dialogRef.close();
  }

}
