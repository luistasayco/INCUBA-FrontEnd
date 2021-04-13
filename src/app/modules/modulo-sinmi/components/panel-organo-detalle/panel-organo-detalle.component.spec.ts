import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrganoDetalleComponent } from './panel-organo-detalle.component';

describe('PanelOrganoDetalleComponent', () => {
  let component: PanelOrganoDetalleComponent;
  let fixture: ComponentFixture<PanelOrganoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOrganoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrganoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
