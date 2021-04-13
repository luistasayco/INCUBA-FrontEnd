import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSinmiConsolidadoUpdateComponent } from './tx-sinmi-consolidado-update.component';

describe('TxSinmiConsolidadoUpdateComponent', () => {
  let component: TxSinmiConsolidadoUpdateComponent;
  let fixture: ComponentFixture<TxSinmiConsolidadoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSinmiConsolidadoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSinmiConsolidadoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
