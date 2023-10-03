import { TestBed } from '@angular/core/testing';
import { FinanceService } from './finance.service';
import { of } from 'rxjs';
import { SettingsService } from './settings.service';

describe('FinanceService', () => {
  let service: FinanceService;
  let mockSettingService: Partial<SettingsService>;

  beforeEach(() => {
    mockSettingService = {
      settings$: of({
        initialMoney: 0,
        initialPeanuts: 0
      })
    };
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO write some tests!
});
