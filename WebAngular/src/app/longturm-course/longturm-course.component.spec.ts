import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongturmCourseComponent } from './longturm-course.component';

describe('LongturmCourseComponent', () => {
  let component: LongturmCourseComponent;
  let fixture: ComponentFixture<LongturmCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongturmCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongturmCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
