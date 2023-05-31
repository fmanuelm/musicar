import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stepb3Component } from './stepb3.component';

describe('Stepb3Component', () => {
  let component: Stepb3Component;
  let fixture: ComponentFixture<Stepb3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Stepb3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stepb3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
