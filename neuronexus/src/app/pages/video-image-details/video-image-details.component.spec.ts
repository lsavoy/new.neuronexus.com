import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoImageDetailsComponent } from './video-image-details.component';

describe('VideoImageDetailsComponent', () => {
  let component: VideoImageDetailsComponent;
  let fixture: ComponentFixture<VideoImageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoImageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoImageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
