import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceDetailsComponent } from './science-details.component';

describe('ScienceDetailsComponent', () => {
  let component: ScienceDetailsComponent;
  let fixture: ComponentFixture<ScienceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
