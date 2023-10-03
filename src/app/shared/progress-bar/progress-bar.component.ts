import { Component, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RxjsUtil } from 'src/app/testing/rxjs-util';

type ThemeClasses = 'yellow' | 'blue';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() taskId?: number | string;
  themeClass: ThemeClasses | '' = '';
  /** Progress towards the  value of the `max` field. */
  value = 0;
  /** To divide the `value` field with. Said division should return a percentage value in decimal notation. */
  max = 5;

  calcPercentage() {
    return Math.floor(this.value / this.max) * 100;
  }
  calcWidth() {
    return `${this.calcPercentage()}%`;
  }
}
