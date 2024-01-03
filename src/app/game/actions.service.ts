import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { BagOfPeanuts, PeanutProduct, SinglePeanut } from 'src/domain/peanuts';
import { FinanceService } from './finance.service';
import { ResourceStockService } from './resource-stock.service';
import { TaskQueueService } from './task-queue.service';
import { TaskDraft } from 'src/domain/tasks';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private readonly resourcesService: ResourceStockService,
    private readonly financeService: FinanceService,
    private readonly taskQueueService: TaskQueueService
  ) { }

  sellPeanut(): Observable<void> {
    return this.sellProduct(new SinglePeanut());
  }

  sellBagOfPeanuts(): Observable<void> {
    return this.sellProduct(new BagOfPeanuts());
  }

  private sellProduct(product: PeanutProduct): Observable<void> {
    return combineLatest([
      this.resourcesService.calculateSellOperationResourceUsage(product),
      this.financeService.calculateProductMarketability(product)
    ]).pipe(
      map(([resourceUsage, marketability]) => ({
        timeCreated: Number(new Date()),
        type: 'sell',
        plan: {
          marketability,
          resourceUsage
        },
        product
      } as TaskDraft)),
      switchMap((draft) => this.taskQueueService.enqueue(draft))
    );
  }
}
