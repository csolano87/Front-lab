import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadofinancieroproveedorComponent } from './estadofinancieroproveedor.component';

describe('EstadofinancieroproveedorComponent', () => {
  let component: EstadofinancieroproveedorComponent;
  let fixture: ComponentFixture<EstadofinancieroproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadofinancieroproveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadofinancieroproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
