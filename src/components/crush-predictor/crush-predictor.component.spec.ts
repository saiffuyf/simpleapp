import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrushPredictorComponent } from './crush-predictor.component';

describe('CrushPredictorComponent', () => {
  let component: CrushPredictorComponent;
  let fixture: ComponentFixture<CrushPredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrushPredictorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrushPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
