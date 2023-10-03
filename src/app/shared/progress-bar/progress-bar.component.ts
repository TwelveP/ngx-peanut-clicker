import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { TasksService } from 'src/app/main-screen/tasks/tasks.service';
import { Task } from 'src/domain/tasks';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit {
  @Input() task?: Task;

  progress$?: Observable<number>;

  constructor(
    private readonly tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.progress$ = this.tasksService.activeTask$.pipe(
      filter(() => this.task?.state === 'active'),
      switchMap(() => this.tasksService.currentTaskProgressPercent$.pipe(
        takeWhile(percent => (percent < 100))
      )),
      startWith(0)
    );
  }
}
