import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAs400Component } from './manual-as400.component';

describe('ManualAs400Component', () => {
  let component: ManualAs400Component;
  let fixture: ComponentFixture<ManualAs400Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualAs400Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualAs400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
