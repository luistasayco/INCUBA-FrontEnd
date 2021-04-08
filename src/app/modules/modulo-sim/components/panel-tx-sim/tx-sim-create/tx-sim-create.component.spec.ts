import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSimCreateComponent } from './tx-sim-create.component';

describe('TxSimCreateComponent', () => {
  let component: TxSimCreateComponent;
  let fixture: ComponentFixture<TxSimCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSimCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSimCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
