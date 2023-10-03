import { Injectable } from '@angular/core';
import { ReplaySubject, take, tap } from 'rxjs';
import { PeanutProduct } from 'src/domain/peanuts';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})
export class PeanutsService {
  private _peanutStock = NaN;
  private _money = NaN;
  private _peanutStockSource = new ReplaySubject<number>(1);
  private _moneySource = new ReplaySubject<number>(1);

  peanutStock$ = this._peanutStockSource.asObservable();
  money$ = this._moneySource.asObservable();

  constructor(
    private readonly settingsService: SettingsService
  ) {
    this.waitForInitialResources();
  }

  sell(product: PeanutProduct) {
    this._money += this.calculateProductPrice(product);
    this._peanutStock -= product.peanutsAmount;
    this._moneySource.next(this._money);
    this._peanutStockSource.next(this._peanutStock);
  }

  calculateProductPrice(peanutType: PeanutProduct): number {
    const taxPercentage = 0;
    return peanutType.initialProductionCost * (100 - taxPercentage);
  }

  private waitForInitialResources() {
    this.settingsService.settings$.pipe(
      take(1),
      tap(settings => {
        this._money = settings.initialMoney;
        this._moneySource.next(this._money);
      }),
      tap(settings => {
        this._peanutStock = settings.initialPeanuts;
        this._peanutStockSource.next(this._peanutStock);
      })
    ).subscribe();
  }
}
