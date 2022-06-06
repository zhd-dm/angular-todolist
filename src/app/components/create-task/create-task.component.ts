import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/types';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  createTaskForm = new FormGroup ({
    taskNameFormControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    taskDeadlineFormControl: new FormControl('', [Validators.required]),
    taskCategoryFormControl: new FormControl(''),
    taskPriorityFormControl: new FormControl('')
  })




  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private task: TaskService
  ) { }

  newTask: ITask = {
    id: this.task.incrementId(),
    name: "",
    deadline: 0,
    priority: false,
    category: ""
  }

  ngOnInit(): void {
  }

  createTask() {
    this.newTask.name = this.createTaskForm.value.taskNameFormControl;
    this.newTask.deadline = this.createTaskForm.value.taskDeadlineFormControl;
    this.newTask.category = this.createTaskForm.value.taskCategoryFormControl;
    this.newTask.priority = this.createTaskForm.value.taskPriorityFormControl;

    this.task.saveTask(this.newTask)
    // tasks.push(this.task)

    this.dialogRef.close();
  }
}
