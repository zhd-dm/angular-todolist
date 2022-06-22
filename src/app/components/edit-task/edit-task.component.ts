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
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    deadline: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    priority: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editedTaskData: ITask,
    private taskService: TaskService,
    private categoryService: CategoryService
    ) {}

  editedTask: ITask = {
    id: 0,
    name: '',
    deadline: "",
    owner: ""
  }

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();

    if(this.editedTaskData) {
      // console.error(this.taskForm.controls);
      // Object.keys(this.editedTaskData).forEach(key => {
      //   console.error(this.taskForm.controls[key])
      //   if(!this.taskForm.controls[key].value) {
      //     this.taskForm.controls[key].value = ''
      //   }
      //   this.taskForm.controls[key].setValue(this.editedTaskData[key])
      // });
      this.taskForm.controls['id'].setValue(this.editedTaskData.id);
      this.taskForm.controls['name'].setValue(this.editedTaskData.name);
      this.taskForm.controls['deadline'].setValue(this.editedTaskData.deadline);
      this.taskForm.controls['category'].setValue(this.editedTaskData.category);
      this.taskForm.controls['priority'].setValue(this.editedTaskData.priority);
      console.log('Old data: ', this.editedTaskData);
    }
  }

  public updateTask(): void {
    // Object.keys(this.editedTask).forEach(key => {
      // this.editedTask[key] = this.taskForm.value[key]
      // console.log(this.taskForm.value)
    // });

    this.editedTask.id = this.taskForm.value.id;
    this.editedTask.name = this.taskForm.value.name;
    this.editedTask.deadline = this.taskForm.value.deadline;
    this.editedTask.category = this.taskForm.value.category;
    this.editedTask.priority = this.taskForm.value.priority || false;
    console.log('Send to save: ', this.editedTask);

    this.taskService.updateTask(this.editedTask);
    this.dialogRef.close(this.editedTask);
  }

}
