import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesResultadosComponent } from './reportes-resultados.component';

describe('ReportesResultadosComponent', () => {
  let component: ReportesResultadosComponent;
  let fixture: ComponentFixture<ReportesResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesResultadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportesResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
