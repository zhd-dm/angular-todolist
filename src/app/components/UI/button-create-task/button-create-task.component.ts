import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { CreateTaskComponent } from '../../create-task/create-task.component';

@Component({
  selector: 'app-button-create-task',
  templateUrl: './button-create-task.component.html',
  styleUrls: ['./button-create-task.component.scss']
})
export class ButtonCreateTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  openModalCreate() {
    this.dialogRef.open(CreateTaskComponent)
  }
}
