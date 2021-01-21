import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelIrregularidadComponent } from './panel-irregularidad.component';

describe('PanelIrregularidadComponent', () => {
  let component: PanelIrregularidadComponent;
  let fixture: ComponentFixture<PanelIrregularidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelIrregularidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelIrregularidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
