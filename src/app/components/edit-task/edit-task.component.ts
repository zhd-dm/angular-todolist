import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICategory, ITask } from 'src/types';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskForm = new FormGroup ({
    taskIdFormControl: new FormControl(''),
    taskNameFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    taskDeadlineFormControl: new FormControl('', [Validators.required]),
    taskCategoryFormControl: new FormControl(''),
    taskPriorityFormControl: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editedTaskData: any,
    private tasker: TaskService,
    private categoer: CategoryService
    ) { }

  editedTask: ITask = {
    id: 0,
    name: '',
    deadline: 0
  }

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.categories = this.categoer.getCategories();

    if(this.editedTaskData) {
      this.taskForm.controls['taskIdFormControl'].setValue(this.editedTaskData.id);
      this.taskForm.controls['taskNameFormControl'].setValue(this.editedTaskData.name);
      this.taskForm.controls['taskDeadlineFormControl'].setValue(this.editedTaskData.deadline);
      this.taskForm.controls['taskCategoryFormControl'].setValue(this.editedTaskData.category);
      this.taskForm.controls['taskPriorityFormControl'].setValue(this.editedTaskData.priority);
      console.log('Old data: ', this.editedTaskData);
    }
  }

  updateTask(): void {
    this.editedTask.id = this.taskForm.value.taskIdFormControl;
    this.editedTask.name = this.taskForm.value.taskNameFormControl;
    this.editedTask.deadline = this.taskForm.value.taskDeadlineFormControl;
    this.editedTask.category = this.taskForm.value.taskCategoryFormControl;
    this.editedTask.priority = this.taskForm.value.taskPriorityFormControl || false;
    console.log('Send to save: ', this.editedTask);

    this.tasker.updateTask(this.editedTask);
    this.dialogRef.close(this.editedTask);
  }

}
