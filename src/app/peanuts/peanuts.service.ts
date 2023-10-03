import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeanutProduct } from 'src/domain/peanuts';

@Injectable({
  providedIn: 'root'
})
export class PeanutsService {
  _peanutStock = 0;
  _money = 0;
  _peanutStockSource = new BehaviorSubject(this._peanutStock);
  _moneySource = new BehaviorSubject(this._money);

  peanutStock$ = this._peanutStockSource.asObservable();
  money$ = this._moneySource.asObservable();

  constructor() { }

  sell(product: PeanutProduct) {
    this._money += this.calculateProductPrice(product);
    this._peanutStock += product.peanutsAmount;
    this._moneySource.next(this._money);
    this._peanutStockSource.next(this._peanutStock);
  }

  calculateProductPrice(peanutType: PeanutProduct): number {
    const taxPercentage = 0;
    return peanutType.initialProductionCost * (100 - taxPercentage);
  }
}
