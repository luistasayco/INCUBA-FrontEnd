import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoDetalleSprayCreateComponent } from './proceso-detalle-spray-create.component';

describe('ProcesoDetalleSprayCreateComponent', () => {
  let component: ProcesoDetalleSprayCreateComponent;
  let fixture: ComponentFixture<ProcesoDetalleSprayCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoDetalleSprayCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoDetalleSprayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
