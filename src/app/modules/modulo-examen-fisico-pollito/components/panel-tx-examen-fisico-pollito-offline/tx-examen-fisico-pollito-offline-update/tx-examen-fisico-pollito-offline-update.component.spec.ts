import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxExamenFisicoPollitoOfflineUpdateComponent } from './tx-examen-fisico-pollito-offline-update.component';

describe('TxExamenFisicoPollitoOfflineUpdateComponent', () => {
  let component: TxExamenFisicoPollitoOfflineUpdateComponent;
  let fixture: ComponentFixture<TxExamenFisicoPollitoOfflineUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxExamenFisicoPollitoOfflineUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxExamenFisicoPollitoOfflineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
