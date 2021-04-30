import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFiltersComponent } from './image-filters.component';

describe('ImageFiltersComponent', () => {
  let component: ImageFiltersComponent;
  let fixture: ComponentFixture<ImageFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
