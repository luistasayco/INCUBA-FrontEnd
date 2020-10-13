import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSincronizacionComponent } from './panel-sincronizacion.component';

describe('PanelSincronizacionComponent', () => {
  let component: PanelSincronizacionComponent;
  let fixture: ComponentFixture<PanelSincronizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSincronizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
