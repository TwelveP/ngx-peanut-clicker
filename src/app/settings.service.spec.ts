import { TestBed } from '@angular/core/testing';
import { DEFAULT_SETTINGS, SettingsService } from './settings.service';
import { take, tap } from 'rxjs/operators';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
    service.resetAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use default settings', () => {
    service.settings$.pipe(
      take(1),
      tap(settings => expect(settings).toEqual(DEFAULT_SETTINGS))
    ).subscribe();
  });

  it('should assign settings', () => {
    const exampleSettings = {
      initialMoney: 5000,
      initialPeanuts: 100
    };
    service.set(exampleSettings);
    service.settings$.pipe(
      take(1),
      tap(settings => expect(settings).toEqual(exampleSettings))
    ).subscribe();
  });

  it('should reset settings', () => {
    service.set({ initialMoney: 5000 });
    service.resetAll();
    service.settings$.pipe(
      take(1),
      tap(settings => expect(settings).toEqual(DEFAULT_SETTINGS))
    ).subscribe();
  });
});
