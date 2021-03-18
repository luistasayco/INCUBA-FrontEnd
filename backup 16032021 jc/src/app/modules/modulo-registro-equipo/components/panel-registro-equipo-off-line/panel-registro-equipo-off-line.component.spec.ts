import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRegistroEquipoOffLineComponent } from './panel-registro-equipo-off-line.component';

describe('PanelRegistroEquipoOffLineComponent', () => {
  let component: PanelRegistroEquipoOffLineComponent;
  let fixture: ComponentFixture<PanelRegistroEquipoOffLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRegistroEquipoOffLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRegistroEquipoOffLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
