import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks$?: Observable<Task[]>;

  constructor(
    private tasksService: TasksService
  ) {
    this.tasks$ = this.tasksService.taskQueue$.pipe();
  }
}
