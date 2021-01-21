import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoDetalleSubcutaneaCreateComponent } from './proceso-detalle-subcutanea-create.component';

describe('ProcesoDetalleSubcutaneaCreateComponent', () => {
  let component: ProcesoDetalleSubcutaneaCreateComponent;
  let fixture: ComponentFixture<ProcesoDetalleSubcutaneaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoDetalleSubcutaneaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoDetalleSubcutaneaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
