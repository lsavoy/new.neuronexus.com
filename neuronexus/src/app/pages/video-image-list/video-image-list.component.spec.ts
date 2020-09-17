import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoImageListComponent } from './video-image-list.component';

describe('VideoImageListComponent', () => {
  let component: VideoImageListComponent;
  let fixture: ComponentFixture<VideoImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
