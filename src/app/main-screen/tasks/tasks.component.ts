import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskQueueService } from '../../task-queue.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  readonly tasks$?: Observable<Task[]>;
  readonly currentProgressPercent$?: Observable<number>;

  constructor(
    private readonly tasksService: TaskQueueService
  ) {
    this.tasks$ = this.tasksService.taskQueue$.pipe();
    this.currentProgressPercent$ = this.tasksService.currentTaskProgressPercent$.pipe();
  }
}
