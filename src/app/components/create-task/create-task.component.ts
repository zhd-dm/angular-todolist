import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { ICategory, ITask } from 'src/types';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  createTaskForm = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    deadline: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    priority: new FormControl('')
  });

  newTask: ITask = {} as ITask;

  categories: Observable<ICategory[]> = this.categoryService.getCategories();

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private taskService: TaskService,
    private categoryService: CategoryService
  ) { }

  createTask(): void {
    this.newTask = this.createTaskForm.value;
    this.newTask.id = this.taskService.setId();

    if(this.createTaskForm.value.priority === '') {
      this.newTask.priority = false;
    }

    console.log('Send to create: ', this.newTask);

    this.taskService.saveTask(this.newTask)
      .subscribe({
        next: newTask => this.dialogRef.close(newTask),
        error: error => console.error(error)
      })
  }
}
