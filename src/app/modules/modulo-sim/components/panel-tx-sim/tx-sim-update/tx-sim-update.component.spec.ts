import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSimUpdateComponent } from './tx-sim-update.component';

describe('TxSimUpdateComponent', () => {
  let component: TxSimUpdateComponent;
  let fixture: ComponentFixture<TxSimUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSimUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSimUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
