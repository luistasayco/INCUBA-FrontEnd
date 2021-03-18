import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSubTipoExplotacionComponent } from './panel-sub-tipo-explotacion.component';

describe('PanelSubTipoExplotacionComponent', () => {
  let component: PanelSubTipoExplotacionComponent;
  let fixture: ComponentFixture<PanelSubTipoExplotacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSubTipoExplotacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSubTipoExplotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
