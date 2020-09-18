import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBioComponent } from './team-bio.component';

describe('TeamBioComponent', () => {
  let component: TeamBioComponent;
  let fixture: ComponentFixture<TeamBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
