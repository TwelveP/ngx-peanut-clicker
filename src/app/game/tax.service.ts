import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PricedElement } from 'src/domain/base';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private _taxRate = 0;

  calculateTax(product: PricedElement): Observable<number> {
    return of(product.initialProductionCost * this._taxRate);
  }
}
