import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVacunacionSprayOfflineComponent } from './panel-vacunacion-spray-offline.component';

describe('PanelVacunacionSprayOfflineComponent', () => {
  let component: PanelVacunacionSprayOfflineComponent;
  let fixture: ComponentFixture<PanelVacunacionSprayOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVacunacionSprayOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVacunacionSprayOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
