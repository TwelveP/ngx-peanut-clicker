import { TestBed } from '@angular/core/testing';
import { finalize, skip, take, tap } from 'rxjs';
import { SinglePeanut } from 'src/domain/peanuts';
import { ResourcesService } from './resources.service';

describe('ResourcesService', () => {
  let service: ResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update peanut stock amount', () => {
    const attempts = 15;
    let soldPeanuts: number;

    service.peanutStock$.pipe(
      skip(1),
      take(attempts + 1),
      tap(amount => (soldPeanuts = amount)),
      tap(() => service.sell(new SinglePeanut())),
      finalize(() => expect(soldPeanuts).toBe(attempts))
    ).subscribe();
  });
});
