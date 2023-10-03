import { TestBed } from '@angular/core/testing';

import { TUTORIAL_NAMES, TutorialService } from './tutorial.service';

describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set up all tutorials to false', () => {
    for (const name of TUTORIAL_NAMES) {
      expect(service.tutorials[name]).toBeFalse();
    }
  });

  it('should reset all tutorials', () => {
    for (const name of TUTORIAL_NAMES) {
      service.tutorials[name] = true;
    }
    service.resetAll();
    for (const name of TUTORIAL_NAMES) {
      expect(service.tutorials[name]).toBeFalse();
    }
  });
});
