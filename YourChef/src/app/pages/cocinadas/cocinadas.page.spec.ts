import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocinadasPage } from './cocinadas.page';

describe('CocinadasPage', () => {
  let component: CocinadasPage;
  let fixture: ComponentFixture<CocinadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocinadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocinadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
