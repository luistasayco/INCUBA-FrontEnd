import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxSinmiComponent } from './panel-tx-sinmi.component';

describe('PanelTxSinmiComponent', () => {
  let component: PanelTxSinmiComponent;
  let fixture: ComponentFixture<PanelTxSinmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxSinmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxSinmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
