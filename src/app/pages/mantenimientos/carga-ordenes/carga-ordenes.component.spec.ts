import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaOrdenesComponent } from './carga-ordenes.component';

describe('CargaOrdenesComponent', () => {
  let component: CargaOrdenesComponent;
  let fixture: ComponentFixture<CargaOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaOrdenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
