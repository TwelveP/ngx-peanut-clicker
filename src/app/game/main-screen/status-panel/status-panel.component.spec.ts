import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusPanelComponent } from './status-panel.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trustedResourceUrl'
})
class StubTrustedResourceUrlPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return '';
  }
}

describe('StatusPanelComponent', () => {
  let component: StatusPanelComponent;
  let fixture: ComponentFixture<StatusPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusPanelComponent,
        StubTrustedResourceUrlPipe
      ]
    });
    fixture = TestBed.createComponent(StatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
