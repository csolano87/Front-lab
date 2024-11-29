import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPruebasComponent } from './stock-pruebas.component';

describe('StockPruebasComponent', () => {
  let component: StockPruebasComponent;
  let fixture: ComponentFixture<StockPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPruebasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
