import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxExamenFisicoPollitoOfflineCreateComponent } from './tx-examen-fisico-pollito-offline-create.component';

describe('TxExamenFisicoPollitoOfflineCreateComponent', () => {
  let component: TxExamenFisicoPollitoOfflineCreateComponent;
  let fixture: ComponentFixture<TxExamenFisicoPollitoOfflineCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxExamenFisicoPollitoOfflineCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxExamenFisicoPollitoOfflineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
