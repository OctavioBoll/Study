import { TestBed } from '@angular/core/testing';

import { MateriaFirebaseService } from './materia-firebase.service';

describe('MateriaFirebaseService', () => {
  let service: MateriaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
