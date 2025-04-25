import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarExcelProcedenciaComponent } from './generar-excel-procedencia.component';

describe('GenerarExcelProcedenciaComponent', () => {
  let component: GenerarExcelProcedenciaComponent;
  let fixture: ComponentFixture<GenerarExcelProcedenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarExcelProcedenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerarExcelProcedenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
