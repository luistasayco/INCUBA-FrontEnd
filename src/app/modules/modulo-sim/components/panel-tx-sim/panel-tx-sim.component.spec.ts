import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTxSimComponent } from './panel-tx-sim.component';

describe('PanelTxSimComponent', () => {
  let component: PanelTxSimComponent;
  let fixture: ComponentFixture<PanelTxSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTxSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTxSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
