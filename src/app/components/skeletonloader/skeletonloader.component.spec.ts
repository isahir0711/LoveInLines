import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonloaderComponent } from './skeletonloader.component';

describe('SkeletonloaderComponent', () => {
  let component: SkeletonloaderComponent;
  let fixture: ComponentFixture<SkeletonloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
