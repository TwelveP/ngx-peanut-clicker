import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskQueueService } from '../../task-queue.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-task-queue',
  templateUrl: './task-queue.component.html'
})
export class TaskQueueComponent {
  readonly tasks$?: Observable<Task[]>;
  readonly currentProgressPercent$?: Observable<number>;

  constructor(
    private readonly tasksService: TaskQueueService
  ) {
    this.tasks$ = this.tasksService.taskQueue$.pipe();
    this.currentProgressPercent$ = this.tasksService.currentTaskProgressPercent$.pipe();
  }
}
