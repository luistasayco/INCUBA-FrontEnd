import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxExamenFisicoPollitoComponent } from './panel-tx-examen-fisico-pollito.component';

describe('PanelTxExamenFisicoPollitoComponent', () => {
  let component: PanelTxExamenFisicoPollitoComponent;
  let fixture: ComponentFixture<PanelTxExamenFisicoPollitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxExamenFisicoPollitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxExamenFisicoPollitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
