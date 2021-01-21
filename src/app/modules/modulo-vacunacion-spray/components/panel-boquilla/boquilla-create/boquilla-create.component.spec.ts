import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoquillaCreateComponent } from './boquilla-create.component';

describe('BoquillaCreateComponent', () => {
  let component: BoquillaCreateComponent;
  let fixture: ComponentFixture<BoquillaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoquillaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoquillaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
