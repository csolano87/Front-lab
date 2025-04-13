import { TestBed } from '@angular/core/testing';

import { WorkListOrdenService } from './work-list-orden.service';

describe('WorkListOrdenService', () => {
  let service: WorkListOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkListOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
