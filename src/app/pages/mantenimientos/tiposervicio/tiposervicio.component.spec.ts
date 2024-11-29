import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposervicioComponent } from './tiposervicio.component';

describe('TiposervicioComponent', () => {
  let component: TiposervicioComponent;
  let fixture: ComponentFixture<TiposervicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposervicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposervicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
