import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadofinancieroclienteComponent } from './estadofinancierocliente.component';

describe('EstadofinancieroclienteComponent', () => {
  let component: EstadofinancieroclienteComponent;
  let fixture: ComponentFixture<EstadofinancieroclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadofinancieroclienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadofinancieroclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
