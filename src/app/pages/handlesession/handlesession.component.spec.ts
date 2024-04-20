import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlesessionComponent } from './handlesession.component';

describe('HandlesessionComponent', () => {
  let component: HandlesessionComponent;
  let fixture: ComponentFixture<HandlesessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandlesessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandlesessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
