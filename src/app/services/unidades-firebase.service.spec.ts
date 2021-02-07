import { TestBed } from '@angular/core/testing';

import { UnidadesFirebaseService } from './unidades-firebase.service';

describe('UnidadesFirebaseService', () => {
  let service: UnidadesFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
