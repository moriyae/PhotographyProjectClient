import { TestBed } from '@angular/core/testing';

import { ClientPageService } from './client-page.service';

describe('ClientPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientPageService = TestBed.get(ClientPageService);
    expect(service).toBeTruthy();
  });
});
