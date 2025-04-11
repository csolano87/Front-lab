import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaordenesImportadasComponent } from './listaordenes-importadas.component';

describe('ListaordenesImportadasComponent', () => {
  let component: ListaordenesImportadasComponent;
  let fixture: ComponentFixture<ListaordenesImportadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaordenesImportadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaordenesImportadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
