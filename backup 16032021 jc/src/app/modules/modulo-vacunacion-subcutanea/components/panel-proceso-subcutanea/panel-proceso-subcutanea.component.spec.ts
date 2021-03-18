import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProcesoSubcutaneaComponent } from './panel-proceso-subcutanea.component';

describe('PanelProcesoSubcutaneaComponent', () => {
  let component: PanelProcesoSubcutaneaComponent;
  let fixture: ComponentFixture<PanelProcesoSubcutaneaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelProcesoSubcutaneaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelProcesoSubcutaneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
