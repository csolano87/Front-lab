import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipomuestrasComponent } from './tipomuestras.component';

describe('TipomuestrasComponent', () => {
  let component: TipomuestrasComponent;
  let fixture: ComponentFixture<TipomuestrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipomuestrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipomuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
