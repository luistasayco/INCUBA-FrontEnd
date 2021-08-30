import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDashboardSinmiComponent } from './panel-dashboard-sinmi.component';

describe('PanelDashboardSinmiComponent', () => {
  let component: PanelDashboardSinmiComponent;
  let fixture: ComponentFixture<PanelDashboardSinmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelDashboardSinmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDashboardSinmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
