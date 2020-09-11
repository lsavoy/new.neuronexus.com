import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceUpdateDetailsComponent } from './science-update-details.component';

describe('ScienceUpdateDetailsComponent', () => {
  let component: ScienceUpdateDetailsComponent;
  let fixture: ComponentFixture<ScienceUpdateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceUpdateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
