import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPruebasComponent } from './panel-pruebas.component';

describe('PanelPruebasComponent', () => {
  let component: PanelPruebasComponent;
  let fixture: ComponentFixture<PanelPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPruebasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
