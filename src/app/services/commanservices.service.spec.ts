import { TestBed } from '@angular/core/testing';

import { CommanservicesService } from './commanservices.service';

describe('CommanservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommanservicesService = TestBed.get(CommanservicesService);
    expect(service).toBeTruthy();
  });
});
