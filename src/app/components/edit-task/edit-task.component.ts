import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITask } from 'src/types';

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

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editTask: any
    ) { }

  ngOnInit(): void {
    console.log(this.editTask);
    if(this.editTask) {
      this.taskForm.controls['taskNameFormControl'].setValue(this.editTask.name);
      this.taskForm.controls['taskDeadlineFormControl'].setValue(this.editTask.deadline);
      this.taskForm.controls['taskCategoryFormControl'].setValue(this.editTask.category);
      this.taskForm.controls['taskPriorityFormControl'].setValue(this.editTask.priority);
    }
  }

  updateTask(): void {
    // const updatedTask: ITask = {
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
