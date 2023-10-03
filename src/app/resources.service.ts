import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { PeanutProduct } from 'src/domain/peanuts';
import { FinanceService } from './finance.service';
import { SettingsService } from './settings.service';
import { TaskQueueService } from './task-queue.service';
import { TaxService } from './tax.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private _peanutStock = NaN;
  private readonly _peanutStockSource = new BehaviorSubject(this._peanutStock);

  readonly peanutStock$ = this._peanutStockSource.asObservable();

  constructor(
    private readonly settingsService: SettingsService,
    private readonly tasksService: TaskQueueService,
    private readonly financeService: FinanceService,
    private readonly taxService: TaxService
  ) {
    this.waitForInitialResources();
  }

  sell(product: PeanutProduct) {
    const { price } = this.calculateProductPrice(product);
    this._peanutStock -= product.peanutsAmount;
    this.tasksService.enqueue({
      type: 'sell',
      duration: product.initialProductionCost * 100,
      product,
      callback: () => this.financeService.transact(price)
    });
    this._peanutStockSource.next(this._peanutStock);
  }

  calculateProductPrice(peanutType: PeanutProduct): { price: number, tax: number } {
    const tax = this.taxService.calculateTax(peanutType);
    const price = (peanutType.initialProductionCost * 100) - tax;
    return { price, tax };
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
