import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesPedidosComponent } from './solicitudes-pedidos.component';

describe('SolicitudesPedidosComponent', () => {
  let component: SolicitudesPedidosComponent;
  let fixture: ComponentFixture<SolicitudesPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudesPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
