import { TestBed } from '@angular/core/testing';

import { IngresordenesService } from './ingresordenes.service';

describe('IngresordenesService', () => {
  let service: IngresordenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresordenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
