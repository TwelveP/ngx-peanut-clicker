import { TestBed } from '@angular/core/testing';
import { MainScreenService } from './main-screen.service';
import { ResourcesService } from '../resources.service';

describe('MainScreenService', () => {
  let service: MainScreenService;
  let resourcesService: jasmine.SpyObj<ResourcesService>;

  beforeEach(() => {
    resourcesService = jasmine.createSpyObj('ResourcesService', ['sell']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ResourcesService, useValue: resourcesService }
      ]
    });
    service = TestBed.inject(MainScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sell peanuts', () => {
    service.sellPeanut();
    expect(resourcesService.sell).toHaveBeenCalled();
  });
});
