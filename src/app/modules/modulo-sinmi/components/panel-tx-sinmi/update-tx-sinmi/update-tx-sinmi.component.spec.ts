import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTxSinmiComponent } from './update-tx-sinmi.component';

describe('UpdateTxSinmiComponent', () => {
  let component: UpdateTxSinmiComponent;
  let fixture: ComponentFixture<UpdateTxSinmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTxSinmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTxSinmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
