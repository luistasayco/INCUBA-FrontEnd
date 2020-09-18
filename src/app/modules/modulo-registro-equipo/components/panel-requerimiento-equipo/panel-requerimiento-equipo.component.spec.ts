import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRequerimientoEquipoComponent } from './panel-requerimiento-equipo.component';

describe('PanelRequerimientoEquipoComponent', () => {
  let component: PanelRequerimientoEquipoComponent;
  let fixture: ComponentFixture<PanelRequerimientoEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRequerimientoEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRequerimientoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
