import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/domain/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _finishedTasks: Task[] = [];
  private _taskQueue: Task[] = [];
  private _taskQueueSource = new BehaviorSubject(this._taskQueue);
  private _finishedTasksSource = new BehaviorSubject(this._finishedTasks);

  taskQueue$ = this._taskQueueSource.asObservable();
  finishedTasks$ = this._finishedTasksSource.asObservable();

  constructor() { }

  enqueue(task: Task): void {
    throw { error: 'not implemented' };
  }

  pause(): void {
    throw { error: 'not implemented' };
  }

  resume(): void {
    throw { error: 'not implemented' };
  }
}
