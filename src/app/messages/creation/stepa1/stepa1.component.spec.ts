import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stepa1Component } from './stepa1.component';

describe('Stepa1Component', () => {
  let component: Stepa1Component;
  let fixture: ComponentFixture<Stepa1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Stepa1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stepa1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
