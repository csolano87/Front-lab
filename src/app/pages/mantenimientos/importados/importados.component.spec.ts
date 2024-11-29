import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadosComponent } from './importados.component';

describe('ImportadosComponent', () => {
  let component: ImportadosComponent;
  let fixture: ComponentFixture<ImportadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
