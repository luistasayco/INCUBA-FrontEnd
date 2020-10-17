import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarImagenComponent } from './capturar-imagen.component';

describe('CapturarImagenComponent', () => {
  let component: CapturarImagenComponent;
  let fixture: ComponentFixture<CapturarImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturarImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
