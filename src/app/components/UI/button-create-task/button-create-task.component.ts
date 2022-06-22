import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { CreateTaskComponent } from '../../create-task/create-task.component';

@Component({
  selector: 'app-button-create-task',
  templateUrl: './button-create-task.component.html',
  styleUrls: ['./button-create-task.component.scss']
})
export class ButtonCreateTaskComponent {

  constructor(public dialogRef: MatDialog) { }

  openModalCreate(): void {
    this.dialogRef.open(CreateTaskComponent)
  }
}
