import { Injectable } from '@angular/core';
import { PricedElement } from 'src/domain/base';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private _taxRate = 0;

  calculateTax(product: PricedElement) {
    return (product.initialProductionCost * this._taxRate);
  }
}
