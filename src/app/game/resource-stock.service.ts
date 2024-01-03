import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, tap } from 'rxjs';
import { PeanutProduct } from 'src/domain/peanuts';
import { ResourceUsageReport } from 'src/domain/resources';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceStockService {
  private _peanutStock = NaN;
  private readonly _peanutStockSource = new BehaviorSubject(this._peanutStock);

  readonly peanutStock$ = this._peanutStockSource.asObservable();

  constructor(
    private readonly settingsService: SettingsService
  ) {
    this.waitForInitialResources();
  }

  calculateSellOperationResourceUsage(product: PeanutProduct): Observable<ResourceUsageReport> {
    if (this._peanutStock < product.peanutsAmount) {
      throw new Error('Not enough peanuts in stock');
    }
    return of({
      peanuts: product.peanutsAmount,
      vehicles: Math.ceil(product.peanutsAmount / 1000)
    }).pipe(
      tap(() => {
        this._peanutStock -= product.peanutsAmount;
        this._peanutStockSource.next(this._peanutStock);
      })
    );
  }

  private waitForInitialResources() {
    this.settingsService.settings$.pipe(
      take(1),
      tap(settings => {
        this._peanutStock = settings.initialPeanuts;
        this._peanutStockSource.next(this._peanutStock);
      })
    ).subscribe();
  }
}
