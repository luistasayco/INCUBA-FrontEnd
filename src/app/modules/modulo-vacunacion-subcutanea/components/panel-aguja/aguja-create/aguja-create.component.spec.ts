import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgujaCreateComponent } from './aguja-create.component';

describe('AgujaCreateComponent', () => {
  let component: AgujaCreateComponent;
  let fixture: ComponentFixture<AgujaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgujaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgujaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
