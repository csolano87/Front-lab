import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaordenesexportarComponent } from './listaordenesexportar.component';

describe('ListaordenesexportarComponent', () => {
  let component: ListaordenesexportarComponent;
  let fixture: ComponentFixture<ListaordenesexportarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaordenesexportarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaordenesexportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
