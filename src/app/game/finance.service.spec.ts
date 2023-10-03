import { TestBed } from '@angular/core/testing';
import { concat, of } from 'rxjs';
import { ignoreElements, map, take, takeLast, tap } from 'rxjs/operators';
import { FinanceService } from './finance.service';
import { DEFAULT_SETTINGS, SettingsService } from '../settings.service';

describe('FinanceService', () => {
  let service: FinanceService;
  let mockSettingService: Partial<SettingsService>;

  beforeEach(() => {
    mockSettingService = {
      settings$: of(DEFAULT_SETTINGS)
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: SettingsService, useValue: mockSettingService }
      ]
    });
    service = TestBed.inject(FinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hold default money balance', () => {
    service.money$.pipe(
      take(1),
      tap(money => expect(money).toEqual(DEFAULT_SETTINGS.initialMoney))
    ).subscribe();
  });

  it('should update money balance', () => {
    /** from -50 to +50 */
    const pseudoRandomAmountOfMoney = (Math.floor(Math.random() * 100) - 50)
    /** from 1 to 10 */
    const pseudoRandomAmountOfTimes = (Math.floor(Math.random() * 9)) + 1;

    const transactedAmount = pseudoRandomAmountOfMoney || 1; // in case it's 0
    const times = pseudoRandomAmountOfTimes;
    let initialMoney: number;

    concat(
      service.money$.pipe(
        take(1),
        tap(balance => (initialMoney = balance)),
        ignoreElements()
      ),
      service.money$.pipe(
        take(times + 1), // accounting for the initial value
        tap(balance => expect(balance).toBeDefined()),
        tap(() => service.transact(transactedAmount)) // trigger another emission (looping here)
      )
    ).pipe(
      takeLast(1),
      tap(balance => expect(balance).toBe(initialMoney + (times * transactedAmount)))
    ).subscribe();
  });

  it('should not accept 0 for transact()', () => {
    expect(() => service.transact(0)).toThrowError('Transaction rejected - Invalid or zero-value operation');
  });

  it('should not accept NaN for transact()', () => {
    expect(() => service.transact(NaN)).toThrowError('Transaction rejected - Invalid or zero-value operation');
  });

  it('should not accept decimals for transact()', () => {
    const pseudoRandomAmountOfMoney = Math.floor(Math.random() * 100);
    const decimalAmountOfMoney = pseudoRandomAmountOfMoney / 100;
    expect(() => service.transact(decimalAmountOfMoney)).toThrowError('Transaction rejected - Decimal amounts of money');
  });

  it('should not allow expenses upon a state of bankrupcy', () => {
    service.money$.pipe(
      take(1),
      map(balance => (-((balance * 2) + service.bankrupcyLine))),
      tap(doubleCurrentBalance => expect(() => service.transact(doubleCurrentBalance)).toThrowError('Transaction rejected - Balance is too low'))
    ).subscribe();
  });
});
