import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockbodegasComponent } from './stockbodegas.component';

describe('StockbodegasComponent', () => {
  let component: StockbodegasComponent;
  let fixture: ComponentFixture<StockbodegasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockbodegasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockbodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
