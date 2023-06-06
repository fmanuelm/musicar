import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosGrupoRegionalComponent } from './puntos-grupo-regional.component';

describe('PuntosGrupoRegionalComponent', () => {
  let component: PuntosGrupoRegionalComponent;
  let fixture: ComponentFixture<PuntosGrupoRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosGrupoRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosGrupoRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
