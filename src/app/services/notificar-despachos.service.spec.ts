import { TestBed } from '@angular/core/testing';

import { NotificarDespachosService } from './notificar-despachos.service';

describe('NotificarDespachosService', () => {
  let service: NotificarDespachosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificarDespachosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
