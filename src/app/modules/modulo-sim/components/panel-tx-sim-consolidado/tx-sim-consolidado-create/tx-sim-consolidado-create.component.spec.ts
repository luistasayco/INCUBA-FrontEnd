import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSimConsolidadoCreateComponent } from './tx-sim-consolidado-create.component';

describe('TxSimConsolidadoCreateComponent', () => {
  let component: TxSimConsolidadoCreateComponent;
  let fixture: ComponentFixture<TxSimConsolidadoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSimConsolidadoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSimConsolidadoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
