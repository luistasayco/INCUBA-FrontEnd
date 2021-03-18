import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAsociacionComponent } from './panel-asociacion.component';

describe('PanelAsociacionComponent', () => {
  let component: PanelAsociacionComponent;
  let fixture: ComponentFixture<PanelAsociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAsociacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
