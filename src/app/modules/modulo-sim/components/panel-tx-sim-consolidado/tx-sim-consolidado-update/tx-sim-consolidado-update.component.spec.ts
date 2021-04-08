import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSimConsolidadoUpdateComponent } from './tx-sim-consolidado-update.component';

describe('TxSimConsolidadoUpdateComponent', () => {
  let component: TxSimConsolidadoUpdateComponent;
  let fixture: ComponentFixture<TxSimConsolidadoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSimConsolidadoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSimConsolidadoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
