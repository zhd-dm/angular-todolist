import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

export interface Task {
  name: string;
  deadline: number;
  priority: boolean;
  category?: string;
}

  const DATA: Task[] = [
    {
      name: "Create App",
      deadline: 121313,
      priority: true,
      category: "main"
    },
    {
      name: "Have lunch",
      deadline: 121313,
      priority: false
    },
    {
      name: "Drink water",
      deadline: 121313,
      priority: true,
      category: "food"
    },
    {
      name: "Listen music",
      deadline: 121313,
      priority: true,
    },
    {
      name: "Delete App",
      deadline: 121313,
      priority: false,
      category: "main"
    },
    {
      name: "Have lunch",
      deadline: 121313,
      priority: false
    },
    {
      name: "Drink water",
      deadline: 121313,
      priority: true,
      category: "food"
    },
    {
      name: "Listen music",
      deadline: 121313,
      priority: true,
    },
    {
      name: "Delete App",
      deadline: 121313,
      priority: false,
      category: "main"
    },
    {
      name: "Have lunch",
      deadline: 121313,
      priority: false
    },
    {
      name: "Drink water",
      deadline: 121313,
      priority: true,
      category: "food"
    },
    {
      name: "Listen music",
      deadline: 121313,
      priority: true,
    },
    {
      name: "Delete App",
      deadline: 121313,
      priority: false,
      category: "main"
    }
  ]


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks = DATA;

  constructor(public dialogRef: MatDialog) {}

  openModalEdit() {
    this.dialogRef.open(EditTaskComponent)
  }

  openModalDelete() {
    this.dialogRef.open(DeleteTaskComponent)
  }

  ngOnInit(): void {

  }
}
