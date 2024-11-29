import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipofisiologicoComponent } from './tipofisiologico.component';

describe('TipofisiologicoComponent', () => {
  let component: TipofisiologicoComponent;
  let fixture: ComponentFixture<TipofisiologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipofisiologicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipofisiologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
