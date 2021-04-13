import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganoDetalleComponent } from './create-organo-detalle.component';

describe('CreateOrganoDetalleComponent', () => {
  let component: CreateOrganoDetalleComponent;
  let fixture: ComponentFixture<CreateOrganoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
