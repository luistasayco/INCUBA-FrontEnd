import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVacunaComponent } from './panel-vacuna.component';

describe('PanelVacunaComponent', () => {
  let component: PanelVacunaComponent;
  let fixture: ComponentFixture<PanelVacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
