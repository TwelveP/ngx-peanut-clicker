import { TestBed } from '@angular/core/testing';

import { DEFAULT_SETTINGS, SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use default settings', () => {
    expect(service.getSettingsSnapshot()).toEqual(DEFAULT_SETTINGS);
  });

  it('should assign settings', () => {
    const example = 5000;
    service.set({ initialMoney: example });
    expect(service.getSettingsSnapshot().initialMoney).toEqual(example);
  });

  it('should reset settings', () => {
    service.set({ initialMoney: 5000 });
    service.resetAll();
    expect(service.getSettingsSnapshot()).toEqual(DEFAULT_SETTINGS);
  });
});
