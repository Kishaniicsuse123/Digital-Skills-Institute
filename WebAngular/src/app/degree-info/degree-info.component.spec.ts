import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeInfoComponent } from './degree-info.component';

describe('DegreeInfoComponent', () => {
  let component: DegreeInfoComponent;
  let fixture: ComponentFixture<DegreeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreeInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
