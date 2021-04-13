import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxSinmiOfflineComponent } from './panel-tx-sinmi-offline.component';

describe('PanelTxSinmiOfflineComponent', () => {
  let component: PanelTxSinmiOfflineComponent;
  let fixture: ComponentFixture<PanelTxSinmiOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxSinmiOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxSinmiOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
