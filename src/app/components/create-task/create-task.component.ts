import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { ICategory, ITask } from 'src/types';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  // @Output() evEmit = new EventEmitter();

  createTaskForm = new FormGroup ({
    taskNameFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    taskDeadlineFormControl: new FormControl('', [Validators.required]),
    taskCategoryFormControl: new FormControl(''),
    taskPriorityFormControl: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private tasker: TaskService,
    private categoryService: CategoryService
  ) { }

  newTask: ITask = {
    id: this.tasker.setId(),
    name: "",
    deadline: "",
    owner: ""
  }

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  createTask(): void {
    this.newTask.name = this.createTaskForm.value.taskNameFormControl;
    this.newTask.deadline = this.createTaskForm.value.taskDeadlineFormControl;
    this.newTask.category = this.createTaskForm.value.taskCategoryFormControl;
    this.newTask.priority = this.createTaskForm.value.taskPriorityFormControl || false;

    // this.evEmit.emit(this.newTask);
    this.tasker.saveTask(this.newTask);
    this.dialogRef.close(this.newTask);
  }
}
