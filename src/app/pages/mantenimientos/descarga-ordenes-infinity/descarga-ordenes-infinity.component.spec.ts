import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaOrdenesInfinityComponent } from './descarga-ordenes-infinity.component';

describe('DescargaOrdenesInfinityComponent', () => {
  let component: DescargaOrdenesInfinityComponent;
  let fixture: ComponentFixture<DescargaOrdenesInfinityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescargaOrdenesInfinityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargaOrdenesInfinityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
