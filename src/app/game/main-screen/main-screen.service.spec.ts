import { TestBed } from '@angular/core/testing';
import { MainScreenService } from './main-screen.service';
import { ResourceStockService } from '../resource-stock.service';

describe('MainScreenService', () => {
  let service: MainScreenService;
  let resourcesService: jasmine.SpyObj<ResourceStockService>;

  beforeEach(() => {
    resourcesService = jasmine.createSpyObj('ResourcesService', ['sell']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ResourceStockService, useValue: resourcesService }
      ]
    });
    service = TestBed.inject(MainScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
