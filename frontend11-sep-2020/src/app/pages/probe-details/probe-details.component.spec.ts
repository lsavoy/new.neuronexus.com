import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbeDetailsComponent } from './probe-details.component';

describe('ProbeDetailsComponent', () => {
  let component: ProbeDetailsComponent;
  let fixture: ComponentFixture<ProbeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
