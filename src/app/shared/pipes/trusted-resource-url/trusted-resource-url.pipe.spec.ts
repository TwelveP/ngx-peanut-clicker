import { waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { TrustedResourceUrlPipe } from './trusted-resource-url.pipe';

describe('TrustedResourceUrlPipe', () => {
  let mockDomSanitizer: Partial<DomSanitizer>;

  beforeEach(waitForAsync(() => {
    // TODO use jasmine.SpyObj
    mockDomSanitizer = {
      bypassSecurityTrustResourceUrl(value) { return {}; }
    };
  }));

  it('should create an instance', () => {
    const pipe = new TrustedResourceUrlPipe(mockDomSanitizer as DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
