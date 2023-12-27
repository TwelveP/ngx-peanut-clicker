import { Injectable } from '@angular/core';
import { Task, TaskPlan } from 'src/domain/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskBuilderService {

  constructor(
  ) { }

  buildTask(request?: TaskPlan): Task {
    if (!!request?.type) {
      switch (request.type) {
        case 'buy': return this.buildBuyTask(request);
        case 'sell': return this.buildBuyTask(request);
      }
    }
    throw { message: 'Unknown task request!' };
  }

  private buildBuyTask(request: TaskPlan): Task {
    return {
      taskId: NaN,
      state: 'queued',
      timeCreated: Number(new Date()),
      type: request.type,
      plan: request,
      cost: request.marketability.expenses,
      description: '',
      duration: request.resourceUsage.duration
    };
  }
}
