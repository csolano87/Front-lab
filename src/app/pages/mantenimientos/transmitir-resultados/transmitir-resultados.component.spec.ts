import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitirResultadosComponent } from './transmitir-resultados.component';

describe('TransmitirResultadosComponent', () => {
  let component: TransmitirResultadosComponent;
  let fixture: ComponentFixture<TransmitirResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmitirResultadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransmitirResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
