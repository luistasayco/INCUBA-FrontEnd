import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTipoExplotacionComponent } from './panel-tipo-explotacion.component';

describe('PanelTipoExplotacionComponent', () => {
  let component: PanelTipoExplotacionComponent;
  let fixture: ComponentFixture<PanelTipoExplotacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTipoExplotacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTipoExplotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
