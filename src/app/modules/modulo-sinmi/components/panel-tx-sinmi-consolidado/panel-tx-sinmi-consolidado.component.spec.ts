import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxSinmiConsolidadoComponent } from './panel-tx-sinmi-consolidado.component';

describe('PanelTxSinmiConsolidadoComponent', () => {
  let component: PanelTxSinmiConsolidadoComponent;
  let fixture: ComponentFixture<PanelTxSinmiConsolidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxSinmiConsolidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxSinmiConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
