import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingpostComponent } from './drawingpost.component';

describe('DrawingpostComponent', () => {
  let component: DrawingpostComponent;
  let fixture: ComponentFixture<DrawingpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawingpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
