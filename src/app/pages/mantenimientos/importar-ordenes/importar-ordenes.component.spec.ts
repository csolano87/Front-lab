import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarOrdenesComponent } from './importar-ordenes.component';

describe('ImportarOrdenesComponent', () => {
  let component: ImportarOrdenesComponent;
  let fixture: ComponentFixture<ImportarOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportarOrdenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportarOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
