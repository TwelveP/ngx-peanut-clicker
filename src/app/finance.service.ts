import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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

  reset(params: FinancialResetParams) {
    this._transactions = params.transactions || [];
    this._money = params.money || 0;
    this._moneySource.next(this._money);
  }
}
