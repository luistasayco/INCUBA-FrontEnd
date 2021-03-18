import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxExamenFisicoPollitoOfflineComponent } from './panel-tx-examen-fisico-pollito-offline.component';

describe('PanelTxExamenFisicoPollitoOfflineComponent', () => {
  let component: PanelTxExamenFisicoPollitoOfflineComponent;
  let fixture: ComponentFixture<PanelTxExamenFisicoPollitoOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxExamenFisicoPollitoOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxExamenFisicoPollitoOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
