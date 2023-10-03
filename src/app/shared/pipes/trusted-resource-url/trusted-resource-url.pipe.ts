import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'trustedResourceUrl' })
export class TrustedResourceUrlPipe
  implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    } else {
      throw new Error('Must provide a string');
    }
  }

}
