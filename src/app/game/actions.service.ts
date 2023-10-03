import { Injectable } from '@angular/core';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { BagOfPeanuts, PeanutProduct, SinglePeanut } from 'src/domain/peanuts';
import { FinanceService } from './finance.service';
import { ResourcesService } from './resources.service';
import { TaskQueueService } from './task-queue.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly financeService: FinanceService,
    private readonly tasksService: TaskQueueService
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
      switchMap(([resourceUsage, marketability]) => this.tasksService.enqueue({
        marketability,
        resourceUsage,
        type: 'sell'
      }))
    );
  }
}
