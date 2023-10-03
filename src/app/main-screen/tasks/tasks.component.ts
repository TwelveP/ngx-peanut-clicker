import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  tasks$?: Observable<Task[]>;
  currentProgressPercent$?: Observable<number>;

  constructor(
    private tasksService: TasksService
  ) {
    this.tasks$ = this.tasksService.taskQueue$.pipe();
    this.currentProgressPercent$ = this.tasksService.currentTaskProgressPercent$.pipe();
  }
}
