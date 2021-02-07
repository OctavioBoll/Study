import { TestBed } from '@angular/core/testing';

import { TemasFirebaseService } from './temas-firebase.service';

describe('TemasFirebaseService', () => {
  let service: TemasFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemasFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
