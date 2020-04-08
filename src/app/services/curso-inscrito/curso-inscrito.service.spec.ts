import { TestBed } from '@angular/core/testing';

import { CursoInscritoService } from './curso-inscrito.service';

describe('CursoInscritoService', () => {
  let service: CursoInscritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoInscritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
