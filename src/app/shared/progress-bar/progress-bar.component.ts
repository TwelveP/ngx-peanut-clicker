import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { TaskQueueService } from 'src/app/task-queue.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit {
  @Input() task?: Task;

  progress$?: Observable<number>;

  constructor(
    private readonly taskQueueService: TaskQueueService
  ) { }

  ngOnInit(): void {
    this.progress$ = this.taskQueueService.activeTask$.pipe(
      filter(() => this.task?.state === 'active'),
      switchMap(() => this.taskQueueService.currentTaskProgressPercent$.pipe(
        takeWhile(percent => (percent < 100))
      )),
      startWith(0)
    );
  }
}
