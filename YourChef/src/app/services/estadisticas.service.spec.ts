import { TestBed } from '@angular/core/testing';

import { EstadisticasService } from './estadisticas.service';

describe('EstadisticasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadisticasService = TestBed.get(EstadisticasService);
    expect(service).toBeTruthy();
  });
});
