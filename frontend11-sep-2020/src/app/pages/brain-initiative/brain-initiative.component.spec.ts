import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainInitiativeComponent } from './brain-initiative.component';

describe('BrainInitiativeComponent', () => {
  let component: BrainInitiativeComponent;
  let fixture: ComponentFixture<BrainInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
