import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionsComponent } from './cotizacions.component';

describe('CotizacionsComponent', () => {
  let component: CotizacionsComponent;
  let fixture: ComponentFixture<CotizacionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
