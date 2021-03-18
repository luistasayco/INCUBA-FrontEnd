import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoDetalleCreateComponent } from './proceso-detalle-create.component';

describe('ProcesoDetalleCreateComponent', () => {
  let component: ProcesoDetalleCreateComponent;
  let fixture: ComponentFixture<ProcesoDetalleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoDetalleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoDetalleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
