import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQueueItemComponent } from './task-queue-item.component';

describe('ProgressBarComponent', () => {
  let component: TaskQueueItemComponent;
  let fixture: ComponentFixture<TaskQueueItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskQueueItemComponent]
    });
    fixture = TestBed.createComponent(TaskQueueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
