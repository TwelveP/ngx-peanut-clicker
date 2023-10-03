import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { TaskQueueService } from 'src/app/game/task-queue.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-task-queue-item',
  templateUrl: './task-queue-item.component.html'
})
export class TaskQueueItemComponent {
  @Input() task?: Task;

  progress$: Observable<number>;
  widthPercent$: Observable<string>;

  constructor(
    private readonly taskQueueService: TaskQueueService
  ) {
    this.progress$ = this.taskQueueService.activeTask$.pipe(
      filter(() => this.task?.state === 'active'),
      switchMap(() => this.taskQueueService.currentTaskProgressPercent$.pipe(
        takeWhile(percent => (percent < 100))
      )),
      startWith(0)
    );
    this.widthPercent$ = this.progress$.pipe(
      map(v => `${v}%`)
    );
  }
}
