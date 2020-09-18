import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCalidadComponent } from './panel-calidad.component';

describe('PanelCalidadComponent', () => {
  let component: PanelCalidadComponent;
  let fixture: ComponentFixture<PanelCalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
