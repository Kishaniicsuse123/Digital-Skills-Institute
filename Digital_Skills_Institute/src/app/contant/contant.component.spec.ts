import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContantComponent } from './contant.component';

describe('ContantComponent', () => {
  let component: ContantComponent;
  let fixture: ComponentFixture<ContantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
