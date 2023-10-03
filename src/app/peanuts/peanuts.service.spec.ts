import { TestBed } from '@angular/core/testing';

import { finalize, skip, take, tap } from 'rxjs';
import { SinglePeanut } from 'src/domain/peanuts';
import { PeanutsService } from './peanuts.service';

describe('PeanutsService', () => {
  let service: PeanutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeanutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update sold peanuts amount', () => {
    const attempts = 15;
    let soldPeanuts: number;

    service.totalProducedPeanuts$.pipe(
      skip(1),
      take(attempts + 1),
      tap(amount => (soldPeanuts = amount)),
      tap(() => service.sell(new SinglePeanut())),
      finalize(() => expect(soldPeanuts).toBe(attempts))
    ).subscribe();
  });
});
