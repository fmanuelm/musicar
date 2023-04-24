import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsLinkComponent } from './buttons-link.component';

describe('ButtonsLinkComponent', () => {
  let component: ButtonsLinkComponent;
  let fixture: ComponentFixture<ButtonsLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
