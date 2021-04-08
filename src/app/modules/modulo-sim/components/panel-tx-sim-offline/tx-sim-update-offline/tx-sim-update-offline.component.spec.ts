import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSimUpdateOfflineComponent } from './tx-sim-update-offline.component';

describe('TxSimUpdateOfflineComponent', () => {
  let component: TxSimUpdateOfflineComponent;
  let fixture: ComponentFixture<TxSimUpdateOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxSimUpdateOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxSimUpdateOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
