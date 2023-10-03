import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeanutProduct } from 'src/domain/peanuts';

@Injectable({
  providedIn: 'root'
})
export class PeanutsService {
  _totalProducedPeanuts = 0;
  _money = 0;
  _totalProducedPeanutsSource = new BehaviorSubject(this._totalProducedPeanuts);
  _moneySource = new BehaviorSubject(this._money);

  totalProducedPeanuts$ = this._totalProducedPeanutsSource.asObservable();
  money$ = this._moneySource.asObservable();

  constructor() { }

  sell(product: PeanutProduct) {
    this._money += this.calculateProductPrice(product);
    this._totalProducedPeanuts += product.peanutsAmount;
    this._moneySource.next(this._money);
    this._totalProducedPeanutsSource.next(this._totalProducedPeanuts);
  }

  calculateProductPrice(peanutType: PeanutProduct): number {
    const taxPercentage = 0;
    return peanutType.initialProductionCost * (100 - taxPercentage);
  }
}
