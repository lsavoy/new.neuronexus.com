import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsBrochuresComponent } from './catalogs-brochures.component';

describe('CatalogsBrochuresComponent', () => {
  let component: CatalogsBrochuresComponent;
  let fixture: ComponentFixture<CatalogsBrochuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsBrochuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsBrochuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
