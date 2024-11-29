import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarbodegaComponent } from './descargarbodega.component';

describe('DescargarbodegaComponent', () => {
  let component: DescargarbodegaComponent;
  let fixture: ComponentFixture<DescargarbodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescargarbodegaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescargarbodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
