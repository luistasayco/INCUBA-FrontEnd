import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxSimOfflineComponent } from './panel-tx-sim-offline.component';

describe('PanelTxSimOfflineComponent', () => {
  let component: PanelTxSimOfflineComponent;
  let fixture: ComponentFixture<PanelTxSimOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxSimOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxSimOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
