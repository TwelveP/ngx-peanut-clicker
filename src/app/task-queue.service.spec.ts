import { TestBed } from '@angular/core/testing';
import { TaskQueueService } from './task-queue.service';
import { Task } from 'src/domain/tasks';

describe('TaskQueueService', () => {
  let service: TaskQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add tasks to the queue', () => {
    const input = {} as Task;
    expect(() => service.enqueue(input)).not.toThrow();
  });
});
