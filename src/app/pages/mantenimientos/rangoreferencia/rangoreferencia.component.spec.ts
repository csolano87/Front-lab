import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoreferenciaComponent } from './rangoreferencia.component';

describe('RangoreferenciaComponent', () => {
  let component: RangoreferenciaComponent;
  let fixture: ComponentFixture<RangoreferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangoreferenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RangoreferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
