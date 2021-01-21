import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcesoSprayComponent } from './panel-proceso-spray.component';

describe('PanelProcesoSprayComponent', () => {
  let component: PanelProcesoSprayComponent;
  let fixture: ComponentFixture<PanelProcesoSprayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcesoSprayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcesoSprayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
