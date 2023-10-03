import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { SettingsService } from './settings.service';

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
  private _bankruptLine = -1000;

  readonly money$ = this._moneySource.asObservable();

  get transactions() {
    return this._transactions;
  }

  constructor(
    private readonly settingsService: SettingsService
  ) {
    this.waitForInitialResources();
  }

  transact(amount: number) {
    if (amount === 0) {
      console.error('Zero-value financial operation');
    } else if (Math.round(amount) !== amount) {
      console.error('Transacting decimal amounts of money');
    }
    const finalBalance = this._money + amount;
    if (finalBalance < this._bankruptLine) {
      console.error('Balance is too low; cannot make any further spendings')
    }
    this._transactions.push({
      amount,
      finalBalance
    });
    this._money = finalBalance;
    this._moneySource.next(this._money);
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
