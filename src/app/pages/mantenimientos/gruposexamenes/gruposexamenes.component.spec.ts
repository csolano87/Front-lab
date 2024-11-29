import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposexamenesComponent } from './gruposexamenes.component';

describe('GruposexamenesComponent', () => {
  let component: GruposexamenesComponent;
  let fixture: ComponentFixture<GruposexamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposexamenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GruposexamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
