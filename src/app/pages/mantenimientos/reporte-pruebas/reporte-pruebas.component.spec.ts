import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePruebasComponent } from './reporte-pruebas.component';

describe('ReportePruebasComponent', () => {
  let component: ReportePruebasComponent;
  let fixture: ComponentFixture<ReportePruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportePruebasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportePruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
