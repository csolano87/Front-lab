import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaComprasComponent } from './consulta-compras.component';

describe('ConsultaComprasComponent', () => {
  let component: ConsultaComprasComponent;
  let fixture: ComponentFixture<ConsultaComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
