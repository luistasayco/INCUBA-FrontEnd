import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxExamenFisicoPollitoCreateComponent } from './tx-examen-fisico-pollito-create.component';

describe('TxExamenFisicoPollitoCreateComponent', () => {
  let component: TxExamenFisicoPollitoCreateComponent;
  let fixture: ComponentFixture<TxExamenFisicoPollitoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxExamenFisicoPollitoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxExamenFisicoPollitoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
