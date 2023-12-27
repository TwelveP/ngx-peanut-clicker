import { TestBed } from '@angular/core/testing';

import { TaskOrchestratorService } from './task-orchestrator.service';

describe('TaskOrchestratorService', () => {
  let service: TaskOrchestratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskOrchestratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
