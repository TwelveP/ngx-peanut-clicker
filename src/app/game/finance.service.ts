import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { PricedElement } from 'src/domain/base';
import { ProductMarketabilityReport } from 'src/domain/finance';
import { SettingsService } from '../settings.service';
import { TaxService } from './tax.service';

interface FinancialOperation {
  finalBalance: number;
  amount: number;
  details?: any;
}

interface FinancialResetParams {
  transactions?: FinancialOperation[];
  money?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private readonly _moneySource = new ReplaySubject<number>(1);
  private _transactions: FinancialOperation[] = [];
  private _money = NaN;

  readonly bankrupcyLine = -1000;
  readonly money$ = this._moneySource.asObservable();

  get transactions() {
    return this._transactions;
  }

  constructor(
    private readonly taxService: TaxService,
    private readonly settingsService: SettingsService
  ) {
    this.waitForInitialResources();
  }

  transact(amount: number) {
    if (!amount) {
      throw new Error('Transaction rejected - Invalid or zero-value operation');
    }
    if (Math.round(amount) !== amount) {
      throw new Error('Transaction rejected - Decimal amounts of money');
    }
    const finalBalance = this._money + amount;
    if (finalBalance < this.bankrupcyLine) {
      throw new Error('Transaction rejected - Balance is too low');
    }
    this._transactions.push({
      amount,
      finalBalance
    });
    this._money = finalBalance;
    this._moneySource.next(this._money);
  }

  calculateProductMarketability(product: PricedElement): Observable<ProductMarketabilityReport> {
    const cost = product.initialProductionCost;
    return this.taxService.calculateTax(product).pipe(
      map(tax => ({
        profits: (cost * 100) - tax,
        expenses: cost,
        tax
      }))
    );
  }

  private waitForInitialResources() {
    this.settingsService.settings$.pipe(
      take(1),
      tap(settings => this.reset({
        money: settings.initialMoney
      }))
    ).subscribe();
  }

  private reset(params: FinancialResetParams) {
    this._transactions = params.transactions || [];
    this._money = params.money || 0;
    this._moneySource.next(this._money);
  }
}
