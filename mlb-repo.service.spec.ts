import { TestBed, inject } from '@angular/core/testing';

import { MlbRepoService } from './mlb-repo.service';

describe('MlbRepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MlbRepoService]
    });
  });

  it('should be created', inject([MlbRepoService], (service: MlbRepoService) => {
    expect(service).toBeTruthy();
  }));
});
