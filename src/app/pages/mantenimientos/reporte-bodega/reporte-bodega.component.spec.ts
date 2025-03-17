import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteBodegaComponent } from './reporte-bodega.component';

describe('ReporteBodegaComponent', () => {
  let component: ReporteBodegaComponent;
  let fixture: ComponentFixture<ReporteBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteBodegaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
