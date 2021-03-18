import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVacunacionSubcutaneaComponent } from './panel-vacunacion-subcutanea.component';

describe('PanelVacunacionSubcutaneaComponent', () => {
  let component: PanelVacunacionSubcutaneaComponent;
  let fixture: ComponentFixture<PanelVacunacionSubcutaneaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVacunacionSubcutaneaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVacunacionSubcutaneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
