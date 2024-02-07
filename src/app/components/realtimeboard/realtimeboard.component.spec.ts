import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeboardComponent } from './realtimeboard.component';

describe('RealtimeboardComponent', () => {
  let component: RealtimeboardComponent;
  let fixture: ComponentFixture<RealtimeboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealtimeboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
