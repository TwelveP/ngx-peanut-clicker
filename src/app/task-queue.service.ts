import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { distinctUntilChanged, filter, ignoreElements, map, switchMap, takeLast, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Task } from 'src/domain/tasks';
import { ClockService } from './clock.service';

const TASK_UPDATE_INTERVAL = 20;

@Injectable({
  providedIn: 'root'
})
export class TaskQueueService {
  private _finishedTasks: Task[] = [];
  private _taskQueue: Task[] = [];
  private _currentTaskProgress = 0;
  private readonly _taskQueueSource = new BehaviorSubject(this._taskQueue.slice());
  private readonly _activeTaskSource = new BehaviorSubject<Task | null>(null);
  private readonly _currentTaskProgressPercentSource = new BehaviorSubject(0);
  private readonly _finishedTasksSource = new BehaviorSubject(this._finishedTasks);

  readonly taskQueue$ = this._taskQueueSource.asObservable();
  readonly activeTask$ = this._activeTaskSource.asObservable();
  readonly currentTaskProgressPercent$ = this._currentTaskProgressPercentSource.asObservable();
  readonly finishedTasks$ = this._finishedTasksSource.asObservable();

  constructor(
    private readonly clockService: ClockService
  ) { }

  enqueue(task: Task): void {
    if (!task.taskId) {
      task.taskId = (this._finishedTasks.length + this._taskQueue.length + 1);
      task.state = 'queued';
      task.timeCreated = Number(new Date());
    }
    this._taskQueue.push(task);
    this._taskQueueSource.next(this._taskQueue);
  }

  pause(): void {
    throw { error: 'not implemented' };
  }

  resume(): void {
    throw { error: 'not implemented' };
  }

  _doTaskActivationLifecycle() {
    return this.taskQueue$.pipe(
      map(queue => (queue[0] || null)),
      distinctUntilChanged(),
      tap(task => {
        if (task !== null) {
          task.state = 'active';
        }
        this._activeTaskSource.next(task);
      }),
      ignoreElements()
    );
  }

  _doTaskProgressLifecycle() {
    return this.clockService.state$.pipe(
      filter(state => (state === 'resumed' || state === 'running')),
      switchMap(() => this.activeTask$.pipe(
        takeUntil(this.clockService.state$.pipe(
          filter(state => (state === 'paused'))
        )),
      )),
      filter((task): task is Task => (task !== null)),
      switchMap(task => this._progressLifecycle(task).pipe(
        takeUntil(this.clockService.state$.pipe(
          filter(state => (state === 'paused'))
        ))
      )),
      ignoreElements()
    );
  }

  private _progressLifecycle(task: Task) {
    const initialTimeSpent = this._currentTaskProgress;
    return interval(TASK_UPDATE_INTERVAL).pipe(
      map(i => (((i + 1) * TASK_UPDATE_INTERVAL) + initialTimeSpent)),
      tap(timeSpent => (this._currentTaskProgress = timeSpent)),
      tap(timeSpent => {
        const percent = Math.floor((timeSpent / task.duration) * 100);
        this._currentTaskProgressPercentSource.next(percent);
      }),
      map(timeSpent => (task.duration - timeSpent)),
      takeWhile(remaining => (remaining > 0)),
      takeLast(1),
      tap(() => {
        const finishedTask = this._taskQueue.slice(0, 1)[0];
        finishedTask.state = 'finished';
        this._finishedTasks.push(finishedTask);
        if (finishedTask.callback) {
          finishedTask.callback();
        }
      }),
      tap(() => {
        const queue = this._taskQueue.slice(1, Math.max(this._taskQueue.length, 0));
        this._taskQueue = queue;
      }),
      tap(() => {
        this._currentTaskProgress = 0;
        this._currentTaskProgressPercentSource.next(0);
        this._finishedTasksSource.next(this._finishedTasks);
        this._taskQueueSource.next(this._taskQueue);
      })
    );
  }
}
