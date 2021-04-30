import { TestBed } from '@angular/core/testing';

import { ImageFiltersService } from './image-filters.service';

describe('ImageFiltersService', () => {
  let service: ImageFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
