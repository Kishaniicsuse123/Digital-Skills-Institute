import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortturmcourseinfoComponent } from './sortturmcourseinfo.component';

describe('SortturmcourseinfoComponent', () => {
  let component: SortturmcourseinfoComponent;
  let fixture: ComponentFixture<SortturmcourseinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortturmcourseinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortturmcourseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
