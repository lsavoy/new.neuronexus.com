import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyElectrodeArrayListComponent } from './technology-electrode-array-list.component';

describe('TechnologyElectrodeArrayListComponent', () => {
  let component: TechnologyElectrodeArrayListComponent;
  let fixture: ComponentFixture<TechnologyElectrodeArrayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyElectrodeArrayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyElectrodeArrayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
