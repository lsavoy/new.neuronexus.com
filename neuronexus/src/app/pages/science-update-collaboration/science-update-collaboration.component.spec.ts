import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceUpdateCollaborationComponent } from './science-update-collaboration.component';

describe('ScienceUpdateCollaborationComponent', () => {
  let component: ScienceUpdateCollaborationComponent;
  let fixture: ComponentFixture<ScienceUpdateCollaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceUpdateCollaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceUpdateCollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
