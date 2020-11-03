import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxExamenFisicoPollitoUpdateComponent } from './tx-examen-fisico-pollito-update.component';

describe('TxExamenFisicoPollitoUpdateComponent', () => {
  let component: TxExamenFisicoPollitoUpdateComponent;
  let fixture: ComponentFixture<TxExamenFisicoPollitoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxExamenFisicoPollitoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxExamenFisicoPollitoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
