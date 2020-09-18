import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRegistroEquipoComponent } from './panel-registro-equipo.component';

describe('PanelRegistroEquipoComponent', () => {
  let component: PanelRegistroEquipoComponent;
  let fixture: ComponentFixture<PanelRegistroEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRegistroEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRegistroEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
