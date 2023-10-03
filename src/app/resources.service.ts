import { Injectable } from '@angular/core';
import { ReplaySubject, take, tap } from 'rxjs';
import { PeanutProduct } from 'src/domain/peanuts';
import { SettingsService } from './settings.service';
import { TaskQueueService } from './task-queue.service';
import { FinanceService } from './finance.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private _peanutStock = NaN;
  private _peanutStockSource = new ReplaySubject<number>(1);

  peanutStock$ = this._peanutStockSource.asObservable();

  constructor(
    private readonly settingsService: SettingsService,
    private readonly tasksService: TaskQueueService,
    private readonly financeService: FinanceService
  ) {
    this.waitForInitialResources();
  }

  sell(product: PeanutProduct) {
    const value = this.calculateProductPrice(product);
    this._peanutStock -= product.peanutsAmount;
    this.tasksService.enqueue({
      type: 'sell',
      duration: product.initialProductionCost * 100,
      product,
      callback: () => this.financeService.transact(value)
    });
    this._peanutStockSource.next(this._peanutStock);
  }

  calculateProductPrice(peanutType: PeanutProduct): number {
    const taxPercentage = 0; // TODO
    return peanutType.initialProductionCost * (100 - taxPercentage);
  }

  private waitForInitialResources() {
    this.settingsService.settings$.pipe(
      take(1),
      tap(settings => this.financeService.reset({
        money: settings.initialMoney
      })),
      tap(settings => {
        this._peanutStock = settings.initialPeanuts;
        this._peanutStockSource.next(this._peanutStock);
      })
    ).subscribe();
  }
}
