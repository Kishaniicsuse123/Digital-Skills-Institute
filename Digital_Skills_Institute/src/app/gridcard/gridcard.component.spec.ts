import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridcardComponent } from './gridcard.component';

describe('GridcardComponent', () => {
  let component: GridcardComponent;
  let fixture: ComponentFixture<GridcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
