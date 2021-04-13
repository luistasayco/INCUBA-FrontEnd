import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTxSinmiOfflineComponent } from './update-tx-sinmi-offline.component';

describe('UpdateTxSinmiOfflineComponent', () => {
  let component: UpdateTxSinmiOfflineComponent;
  let fixture: ComponentFixture<UpdateTxSinmiOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTxSinmiOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTxSinmiOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
