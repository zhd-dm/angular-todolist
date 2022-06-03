import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from 'src/types';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskForm = new FormGroup ({
    taskNameFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    taskDeadlineFormControl: new FormControl('', [Validators.required]),
    taskCategoryFormControl: new FormControl(''),
    taskPriorityFormControl: new FormControl('')
  })

  // taskNameFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  // taskDeadlineFormControl = new FormControl('', [Validators.required]);
  // taskCategoryFormControl = new FormControl('');
  // taskPriorityFormControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>
    ) { }

  ngOnInit(): void {
  }

  updateTask(): void {
    console.log(this.taskForm.value);
    // const updatedTask: Task = {
      // name: this.taskNameFormControl.value,
      // deadline: this.taskDeadlineFormControl.value,
      // category: this.taskCategoryFormControl,
      // priority: this.taskPriorityFormControl
    // }
    // console.log(updatedTask)
    // console.log(taskForm.valid)
    console.log(this.taskForm.value)
    this.dialogRef.close();
  }

}
