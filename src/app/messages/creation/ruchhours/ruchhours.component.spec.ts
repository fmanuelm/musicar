import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuchhoursComponent } from './ruchhours.component';

describe('RuchhoursComponent', () => {
  let component: RuchhoursComponent;
  let fixture: ComponentFixture<RuchhoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuchhoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuchhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
