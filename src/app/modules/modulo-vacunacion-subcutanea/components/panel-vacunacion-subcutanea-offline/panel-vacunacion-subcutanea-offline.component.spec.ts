import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVacunacionSubcutaneaOfflineComponent } from './panel-vacunacion-subcutanea-offline.component';

describe('PanelVacunacionSubcutaneaOfflineComponent', () => {
  let component: PanelVacunacionSubcutaneaOfflineComponent;
  let fixture: ComponentFixture<PanelVacunacionSubcutaneaOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVacunacionSubcutaneaOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVacunacionSubcutaneaOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
