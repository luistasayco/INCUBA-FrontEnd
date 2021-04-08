import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSimCreateOfflineComponent } from './tx-sim-create-offline.component';

describe('TxSimCreateOfflineComponent', () => {
  let component: TxSimCreateOfflineComponent;
  let fixture: ComponentFixture<TxSimCreateOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSimCreateOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSimCreateOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
