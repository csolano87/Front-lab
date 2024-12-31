import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoStockComponent } from './listado-stock.component';

describe('ListadoStockComponent', () => {
  let component: ListadoStockComponent;
  let fixture: ComponentFixture<ListadoStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
