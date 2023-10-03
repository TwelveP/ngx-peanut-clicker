import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { Task } from 'src/domain/tasks';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add tasks to the queue', () => {
    const input = {} as Task;
    expect(service.enqueue(input)).not.toThrow();
  });

  it('should pause and resume the queue', () => {
    expect(service.pause()).not.toThrow();
    expect(service.resume()).not.toThrow();
  });
});
