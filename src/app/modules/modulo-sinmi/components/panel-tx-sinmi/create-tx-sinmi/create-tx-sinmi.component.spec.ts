import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTxSinmiComponent } from './create-tx-sinmi.component';

describe('CreateTxSinmiComponent', () => {
  let component: CreateTxSinmiComponent;
  let fixture: ComponentFixture<CreateTxSinmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTxSinmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTxSinmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
