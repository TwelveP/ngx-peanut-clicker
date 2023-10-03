import { TestBed } from '@angular/core/testing';
import { concat, ignoreElements, of, take, takeLast, tap } from 'rxjs';
import { SinglePeanut } from 'src/domain/peanuts';
import { FinanceService } from './finance.service';
import { ResourcesService } from './resources.service';
import { SettingsService } from './settings.service';
import { TaskQueueService } from './task-queue.service';
import { TaxService } from './tax.service';

describe('ResourcesService', () => {
  let service: ResourcesService;
  let mockSettingService: Partial<SettingsService>;
  let mockTaskQueueService: jasmine.SpyObj<TaskQueueService>;
  let mockFinanceService: jasmine.SpyObj<FinanceService>;
  let mockTaxService: jasmine.SpyObj<TaxService>;

  beforeEach(() => {
    mockSettingService = {
      settings$: of({
        initialMoney: 0,
        initialPeanuts: 0
      })
    };
    mockTaskQueueService = jasmine.createSpyObj(
      'TaskQueueService',
      [ 'enqueue' ]
    );
    mockFinanceService = jasmine.createSpyObj(
      'FinanceService',
      ['transact', 'reset']
    );
    mockTaxService = jasmine.createSpyObj(
      'TaxService',
      ['calculateTax']
    );
    mockTaxService.calculateTax.and.returnValue(0);

    TestBed.configureTestingModule({
      providers: [
        { provide: SettingsService,   useValue: mockSettingService },
        { provide: TaskQueueService,  useValue: mockTaskQueueService },
        { provide: FinanceService,    useValue: mockFinanceService },
        { provide: TaxService,        useValue: mockTaxService }
      ]
    });
    service = TestBed.inject(ResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update peanut stock amount', () => {
    const times = 15;
    let initialPeanuts: number;

    concat(
      service.peanutStock$.pipe(
        take(1),
        tap(amount => (initialPeanuts = amount)),
        ignoreElements()
      ),
      service.peanutStock$.pipe(
        tap(stock => expect(stock).toBeDefined()),
        tap(() => service.sell(new SinglePeanut())),
        take(times)
      )
    ).pipe(
      takeLast(1),
      tap(stock => expect(stock).toBe(initialPeanuts - times))
    ).subscribe();
  });
});
