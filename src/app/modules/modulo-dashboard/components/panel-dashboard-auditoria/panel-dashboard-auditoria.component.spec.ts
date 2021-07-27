import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDashboardAuditoriaComponent } from './panel-dashboard-auditoria.component';

describe('PanelDashboardAuditoriaComponent', () => {
  let component: PanelDashboardAuditoriaComponent;
  let fixture: ComponentFixture<PanelDashboardAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelDashboardAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDashboardAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
