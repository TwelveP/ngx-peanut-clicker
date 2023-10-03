import { TestBed } from '@angular/core/testing';
import { concat, of } from 'rxjs';
import { ignoreElements, take, takeLast, tap } from 'rxjs/operators';
import { FinanceService } from './finance.service';
import { DEFAULT_SETTINGS, SettingsService } from './settings.service';

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
    const transactedAmount = (Math.random() * 100) - 50 || 1;
    /** from 1 to 10 */
    const times = (Math.random() * 9) + 1;
    let initialMoney: number;

    concat(
      service.money$.pipe(
        take(1),
        tap(balance => (initialMoney = balance)),
        ignoreElements()
      ),
      service.money$.pipe(
        tap(balance => expect(balance).toBeDefined()),
        tap(() => service.transact(transactedAmount)), // re-trigger observable emission
        take(times)
      )
    ).pipe(
      takeLast(1),
      tap(balance => expect(balance).toBe(initialMoney + (times * transactedAmount)))
    ).subscribe();
  });
});
