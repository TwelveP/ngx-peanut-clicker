import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskQueueComponent } from './task-queue.component';

describe('TaskQueueComponent', () => {
  let component: TaskQueueComponent;
  let fixture: ComponentFixture<TaskQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskQueueComponent]
    });
    fixture = TestBed.createComponent(TaskQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
