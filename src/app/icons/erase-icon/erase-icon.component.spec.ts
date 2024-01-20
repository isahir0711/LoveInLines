import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraseIconComponent } from './erase-icon.component';

describe('EraseIconComponent', () => {
  let component: EraseIconComponent;
  let fixture: ComponentFixture<EraseIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EraseIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EraseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
