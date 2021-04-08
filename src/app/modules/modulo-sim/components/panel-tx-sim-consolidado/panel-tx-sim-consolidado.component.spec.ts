import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxSimConsolidadoComponent } from './panel-tx-sim-consolidado.component';

describe('PanelTxSimConsolidadoComponent', () => {
  let component: PanelTxSimConsolidadoComponent;
  let fixture: ComponentFixture<PanelTxSimConsolidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxSimConsolidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxSimConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
