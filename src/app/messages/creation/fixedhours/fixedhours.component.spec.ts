import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedhoursComponent } from './fixedhours.component';

describe('FixedhoursComponent', () => {
  let component: FixedhoursComponent;
  let fixture: ComponentFixture<FixedhoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedhoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
