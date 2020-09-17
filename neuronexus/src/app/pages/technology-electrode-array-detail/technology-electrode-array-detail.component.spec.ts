import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyElectrodeArrayDetailComponent } from './technology-electrode-array-detail.component';

describe('TechnologyElectrodeArrayDetailComponent', () => {
  let component: TechnologyElectrodeArrayDetailComponent;
  let fixture: ComponentFixture<TechnologyElectrodeArrayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyElectrodeArrayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyElectrodeArrayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
