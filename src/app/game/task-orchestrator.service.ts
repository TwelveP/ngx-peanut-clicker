import { Injectable } from '@angular/core';
import { EMPTY, Observable, ignoreElements, map, of, tap } from 'rxjs';
import { Task, TaskTypes } from 'src/domain/tasks';
import { FinanceService } from './finance.service';

type TaskCallbackMap = { [v in TaskTypes]: (request: Task) => Observable<any> };

@Injectable({
  providedIn: 'root'
})
export class TaskOrchestratorService {

  private readonly TASK_ADVANCE_CALLBACKS_BY_TYPE: Readonly<TaskCallbackMap> = {
    'buy': (request) => of(request.plan.marketability.expenses / request.duration).pipe(
      map(expenses => Math.ceil(expenses)),
      tap(expenses => this.financeService.transact(-expenses))
    ),
    'sell': (request) => of(request.plan.marketability.profits / request.duration).pipe(
      map(earnings => Math.floor(earnings)),
      tap(moneyEarnings => this.financeService.transact(moneyEarnings))
    )
  };
  private readonly TASK_DONE_CALLBACKS_BY_TYPE: Readonly<TaskCallbackMap> = {
    'buy': () => EMPTY,
    'sell': (request) => of(request.plan.marketability.profits).pipe(
      tap(profits => this.financeService.transact(profits))
    )
  };

  constructor(
    private readonly financeService: FinanceService
  ) { }

  onTaskStarted(taskPlan: Task): Observable<void> {
    return of(taskPlan.plan.marketability.expenses).pipe(
      tap(initialCost => this.financeService.transact(-initialCost)),
      ignoreElements(),
      map(() => void 0)
    );
  }

  onBeforeTaskAdvance(taskPlan: Task): Observable<void> {
    return this.TASK_ADVANCE_CALLBACKS_BY_TYPE[taskPlan.type](taskPlan).pipe(
      ignoreElements(),
      map(() => void 0)
    );
  }

  onTaskFinalized(taskPlan: Task): Observable<void> {
    return this.TASK_DONE_CALLBACKS_BY_TYPE[taskPlan.type](taskPlan).pipe(
      ignoreElements(),
      map(() => void 0)
    );
  }
}
