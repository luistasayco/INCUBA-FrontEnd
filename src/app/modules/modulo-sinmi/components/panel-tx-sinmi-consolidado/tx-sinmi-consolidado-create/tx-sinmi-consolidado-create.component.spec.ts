import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSinmiConsolidadoCreateComponent } from './tx-sinmi-consolidado-create.component';

describe('TxSinmiConsolidadoCreateComponent', () => {
  let component: TxSinmiConsolidadoCreateComponent;
  let fixture: ComponentFixture<TxSinmiConsolidadoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSinmiConsolidadoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSinmiConsolidadoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
