import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcesoComponent } from './panel-proceso.component';

describe('PanelProcesoComponent', () => {
  let component: PanelProcesoComponent;
  let fixture: ComponentFixture<PanelProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
