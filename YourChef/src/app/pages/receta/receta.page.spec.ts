import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaPage } from './receta.page';

describe('RecetaPage', () => {
  let component: RecetaPage;
  let fixture: ComponentFixture<RecetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
