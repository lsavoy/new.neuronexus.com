import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeFinderComponent } from './probe-finder.component';

describe('ProbeFinderComponent', () => {
  let component: ProbeFinderComponent;
  let fixture: ComponentFixture<ProbeFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbeFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
