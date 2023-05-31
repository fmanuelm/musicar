import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stepa3Component } from './stepa3.component';

describe('Stepa3Component', () => {
  let component: Stepa3Component;
  let fixture: ComponentFixture<Stepa3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Stepa3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stepa3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
