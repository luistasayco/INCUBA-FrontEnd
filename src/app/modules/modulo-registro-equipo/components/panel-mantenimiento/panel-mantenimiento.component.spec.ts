import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMantenimientoComponent } from './panel-mantenimiento.component';

describe('PanelMantenimientoComponent', () => {
  let component: PanelMantenimientoComponent;
  let fixture: ComponentFixture<PanelMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
