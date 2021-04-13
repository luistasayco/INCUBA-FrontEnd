import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTxSinmiOfflineComponent } from './create-tx-sinmi-offline.component';

describe('CreateTxSinmiOfflineComponent', () => {
  let component: CreateTxSinmiOfflineComponent;
  let fixture: ComponentFixture<CreateTxSinmiOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTxSinmiOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTxSinmiOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
