import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAgujaComponent } from './panel-aguja.component';

describe('PanelAgujaComponent', () => {
  let component: PanelAgujaComponent;
  let fixture: ComponentFixture<PanelAgujaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAgujaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAgujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
