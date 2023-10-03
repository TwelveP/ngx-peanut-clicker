import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { TaskQueueService } from './game/task-queue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private taskSystemSub?: Subscription;

  constructor(
    private readonly taskQueueService: TaskQueueService
  ) { }

  ngOnInit(): void {
    this.taskSystemSub = this.taskQueueService.lifecycle$.subscribe();
  }

  ngOnDestroy(): void {
    this.taskSystemSub?.unsubscribe();
  }
}
