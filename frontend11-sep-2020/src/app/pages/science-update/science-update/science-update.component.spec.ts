import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceUpdateComponent } from './science-update.component';

describe('ScienceUpdateComponent', () => {
  let component: ScienceUpdateComponent;
  let fixture: ComponentFixture<ScienceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
