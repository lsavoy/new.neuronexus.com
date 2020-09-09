import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceUpdateListComponent } from './science-update-list.component';

describe('ScienceUpdateListComponent', () => {
  let component: ScienceUpdateListComponent;
  let fixture: ComponentFixture<ScienceUpdateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceUpdateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
