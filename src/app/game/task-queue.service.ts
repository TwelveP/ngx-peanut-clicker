import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, ReplaySubject, interval, merge, of, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, filter, ignoreElements, map, share, switchMap, takeLast, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Task, TaskTypes } from 'src/domain/tasks';
import { ClockService } from './clock.service';
import { FinanceService } from './finance.service';
import { ProductMarketabilityReport } from 'src/domain/finance';
import { ResourceUsageReport } from 'src/domain/resources';

const TASK_UPDATE_INTERVAL = 20;

export interface TaskQueueRequest {
  type: TaskTypes;
  marketability: ProductMarketabilityReport;
  resourceUsage: ResourceUsageReport;
}

type TaskCallbackMap = Readonly<{ [v in TaskTypes]: (request: TaskQueueRequest) => Observable<void> }>;

@Injectable({
  providedIn: 'root'
})
export class TaskQueueService {
  private _finishedTasks: Task[] = [];
  private _taskQueue: Task[] = [];
  private _currentTaskProgress = 0;
  private readonly _taskQueueSource = new BehaviorSubject(this._taskQueue.slice());
  private readonly _activeTaskSource = new BehaviorSubject<Task | null>(null);
  private readonly _latestFinishedTaskSource = new ReplaySubject<Task>(1);
  private readonly _currentTaskProgressPercentSource = new BehaviorSubject(0);
  private readonly _finishedTasksSource = new BehaviorSubject(this._finishedTasks);

  readonly taskQueue$ = this._taskQueueSource.asObservable();
  readonly activeTask$ = this._activeTaskSource.asObservable();
  readonly currentTaskProgressPercent$ = this._currentTaskProgressPercentSource.asObservable();
  readonly latestFinishedTaskSource$ = this._latestFinishedTaskSource.asObservable();
  readonly finishedTasks$ = this._finishedTasksSource.asObservable();
  readonly lifecycle$: Observable<never>;

  readonly TASK_ADVANCE_CALLBACKS_BY_TYPE: TaskCallbackMap = {
    'buy': (request) => of(request.marketability.expenses / request.resourceUsage.duration).pipe(
      map(expenses => Math.ceil(expenses)),
      tap(expenses => this.financeService.transact(-expenses)),
      map(() => void 0)
    ),
    'sell': (request) => of(request.marketability.profits / request.resourceUsage.duration).pipe(
      map(earnings => Math.floor(earnings)),
      tap(moneyEarnings => this.financeService.transact(moneyEarnings)),
      map(() => void 0)
    )
  };
  readonly TASK_DONE_CALLBACKS_BY_TYPE: TaskCallbackMap = {
    'buy': () => EMPTY,
    'sell': (request) => of(request.marketability.profits).pipe(
      tap(profits => this.financeService.transact(profits)),
      ignoreElements()
    )
  };

  constructor(
    private readonly clockService: ClockService,
    private readonly financeService: FinanceService
  ) {
    this.lifecycle$ = merge(
      this.propagateActiveTaskInQueue(),
      this.propagateClockSignals()
    ).pipe(
      share()
    );
  }

  enqueue(request: TaskQueueRequest): Observable<void> {
    return new Observable(observer => {
      const task: Task = {
        taskId: (this._finishedTasks.length + this._taskQueue.length + 1),
        state: 'queued',
        timeCreated: Number(new Date()),
        type: request.type,
        duration: request.resourceUsage.duration,
        advanceCallback: this.TASK_ADVANCE_CALLBACKS_BY_TYPE[request.type](request),
        doneCallback: this.TASK_DONE_CALLBACKS_BY_TYPE[request.type](request)
      };
      this._taskQueue.push(task);
      this._taskQueueSource.next(this._taskQueue);
      observer.next();
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
  }

  /**
   * Will watch for distinct consecutives changes to the first element of the queue.
   * When a new first element is detected, it will be propagated and marked as the new active task.
   * When the queue is empty, the active task will be null.
   * @returns An observable that will only execute this logic, without ever emitting a value.
   */
  private propagateActiveTaskInQueue(): Observable<never> {
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

  /**
   * Will watch for clock signals (resumed, paused, etc) and correspondingly control
   * the passage of time, reflected in the progress of the active task.
   * @returns An observable that will only execute this logic, without ever emitting a value.
   */
  private propagateClockSignals(): Observable<never> {
    const whenClockIsRunning = this.clockService.state$.pipe(
      filter(state => (state === 'resumed' || state === 'running'))
    );
    const whenClockIsPaused = this.clockService.state$.pipe(
      filter(state => (state === 'paused'))
    );
    return whenClockIsRunning.pipe(
      switchMap(() => this.activeTask$.pipe(
        filter((task): task is Task => (task !== null)),
        switchMap((task) => this.advanceCurrentTask(task)),
        takeUntil(whenClockIsPaused)
      )),
      ignoreElements()
    );
  }

  /**
   * Will consecutively advance progress towards completion of the active task.
   * When the progress is completed (the inner observable must send a `complete` signal), it will
   * also update, see `whenTaskEnds`.
   * @returns An observable that will only execute this logic, without ever emitting a value.
   */
  private advanceCurrentTask(task: Task): Observable<never> {
    const initialTimeSpent = this._currentTaskProgress;
    return interval(TASK_UPDATE_INTERVAL).pipe(
      switchMap(i => task.advanceCallback.pipe(
        map(() => i),
        catchError(() => {
          this.clockService.togglePause();
          return EMPTY;
        })
      )),
      map(i => (((i + 1) * TASK_UPDATE_INTERVAL) + initialTimeSpent)),
      tap(timeSpent => (this._currentTaskProgress = timeSpent)),
      tap(timeSpent => {
        const percent = Math.floor((timeSpent / task.duration) * 100);
        this._currentTaskProgressPercentSource.next(percent);
      }),
      map(timeSpent => (task.duration - timeSpent)),
      takeWhile(remaining => (remaining > 0)),
      tap({
        complete: () => this.whenTaskEnds()
      }),
      ignoreElements()
    );
  }

  /**
   * - Current 'active' task is marked as 'finished' instead, and is added to the array of finished tasks.
   * - Pops (removes first element) from queue array, which was the 'active' task just now.
   * - Resets/cleans up state after this. This includes propagation of the newly updated queue.
   */
  private whenTaskEnds(): void {
    const finishedTask = this._taskQueue.slice(0, 1)[0];
    finishedTask.state = 'finished';
    this._finishedTasks.push(finishedTask);
    this._latestFinishedTaskSource.next(finishedTask);

    const queue = this._taskQueue.slice(1, Math.max(this._taskQueue.length, 0));
    this._taskQueue = queue;

    this._currentTaskProgress = 0;
    this._currentTaskProgressPercentSource.next(0);
    this._finishedTasksSource.next(this._finishedTasks);
    this._taskQueueSource.next(this._taskQueue);
  }
}
