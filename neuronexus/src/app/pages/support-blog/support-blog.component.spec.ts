import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBlogComponent } from './support-blog.component';

describe('SupportBlogComponent', () => {
  let component: SupportBlogComponent;
  let fixture: ComponentFixture<SupportBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
