import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICategory, ITask } from 'src/types';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskForm: FormGroup = new FormGroup ({});

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editedTaskData: ITask,
    private taskService: TaskService,
    private categoryService: CategoryService
    ) {}

  editedTask: ITask = {} as ITask;

  categories: Observable<ICategory[]> = this.categoryService.getCategories();

  ngOnInit(): void {
    if(this.editedTaskData) {
      this.taskForm = new FormGroup ({
        id: new FormControl(this.editedTaskData.id),
        name: new FormControl(this.editedTaskData.name, [Validators.required, Validators.minLength(5)]),
        deadline: new FormControl(this.editedTaskData.deadline, [Validators.required]),
        category: new FormControl(this.editedTaskData.category),
        priority: new FormControl(this.editedTaskData.priority)
      });

      console.log('Old data: ', this.taskForm.value);
    }
  }

  updateTask(): void {
    this.editedTask = this.taskForm.value;
    console.log('Send to save: ', this.editedTask);

    this.taskService.updateTask(this.editedTask)
      .subscribe({
        next: editedTask => this.dialogRef.close(editedTask),
        error: error => console.error(error)
      })
  }
}
