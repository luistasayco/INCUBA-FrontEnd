import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcesoDetalleSubcutaneaComponent } from './panel-proceso-detalle-subcutanea.component';

describe('PanelProcesoDetalleSubcutaneaComponent', () => {
  let component: PanelProcesoDetalleSubcutaneaComponent;
  let fixture: ComponentFixture<PanelProcesoDetalleSubcutaneaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcesoDetalleSubcutaneaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcesoDetalleSubcutaneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
