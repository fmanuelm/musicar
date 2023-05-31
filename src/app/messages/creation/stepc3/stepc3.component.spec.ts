import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stepc3Component } from './stepc3.component';

describe('Stepc3Component', () => {
  let component: Stepc3Component;
  let fixture: ComponentFixture<Stepc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Stepc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stepc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
