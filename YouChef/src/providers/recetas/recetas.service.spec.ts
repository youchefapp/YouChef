import { TestBed } from '@angular/core/testing';

import { RecetasService } from './recetas.service';

describe('RecetasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecetasService = TestBed.get(RecetasService);
    expect(service).toBeTruthy();
  });
});
