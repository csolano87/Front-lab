import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraUpdateComponent } from './muestra-update.component';

describe('MuestraUpdateComponent', () => {
  let component: MuestraUpdateComponent;
  let fixture: ComponentFixture<MuestraUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuestraUpdateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestraUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
