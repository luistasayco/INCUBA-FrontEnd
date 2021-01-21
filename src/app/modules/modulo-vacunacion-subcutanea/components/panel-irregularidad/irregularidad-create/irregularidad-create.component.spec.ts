import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrregularidadCreateComponent } from './irregularidad-create.component';

describe('IrregularidadCreateComponent', () => {
  let component: IrregularidadCreateComponent;
  let fixture: ComponentFixture<IrregularidadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrregularidadCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrregularidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
