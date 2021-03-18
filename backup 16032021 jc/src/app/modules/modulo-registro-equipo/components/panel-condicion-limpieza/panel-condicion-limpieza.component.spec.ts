import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCondicionLimpiezaComponent } from './panel-condicion-limpieza.component';

describe('PanelCondicionLimpiezaComponent', () => {
  let component: PanelCondicionLimpiezaComponent;
  let fixture: ComponentFixture<PanelCondicionLimpiezaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCondicionLimpiezaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCondicionLimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
