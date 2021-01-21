import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcesoDetalleSprayComponent } from './panel-proceso-detalle-spray.component';

describe('PanelProcesoDetalleSprayComponent', () => {
  let component: PanelProcesoDetalleSprayComponent;
  let fixture: ComponentFixture<PanelProcesoDetalleSprayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcesoDetalleSprayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcesoDetalleSprayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
