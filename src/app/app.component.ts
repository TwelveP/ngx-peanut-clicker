import { Component, OnDestroy } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { TaskQueueService } from './task-queue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  taskSystemSub: Subscription;

  constructor(
    private readonly taskQueueService: TaskQueueService
  ) {
    this.taskSystemSub = merge(
      this.taskQueueService._doTaskActivationLifecycle(),
      this.taskQueueService._doTaskProgressLifecycle()
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.taskSystemSub.unsubscribe();
  }
}
