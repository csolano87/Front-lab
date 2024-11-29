import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubosComponent } from './tubos.component';

describe('TubosComponent', () => {
  let component: TubosComponent;
  let fixture: ComponentFixture<TubosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TubosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TubosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
