import { TestBed } from '@angular/core/testing';
import { TaskQueueRequest, TaskQueueService } from './task-queue.service';

describe('TaskQueueService', () => {
  let service: TaskQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should add tasks to the queue', () => {
    const input = {} as TaskQueueRequest;
    expect(() => service.enqueue(input)).not.toThrow();
  });
});
