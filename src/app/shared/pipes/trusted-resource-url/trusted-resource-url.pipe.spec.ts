import { DomSanitizer } from '@angular/platform-browser';
import { TrustedResourceUrlPipe } from './trusted-resource-url.pipe';

describe('TrustedResourceUrlPipe', () => {
  let mockDomSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    mockDomSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    mockDomSanitizer.bypassSecurityTrustResourceUrl.and.returnValue({});
  });

  it('should create an instance', () => {
    const pipe = new TrustedResourceUrlPipe(mockDomSanitizer as DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
