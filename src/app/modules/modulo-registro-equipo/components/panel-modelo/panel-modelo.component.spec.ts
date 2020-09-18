import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelModeloComponent } from './panel-modelo.component';

describe('PanelModeloComponent', () => {
  let component: PanelModeloComponent;
  let fixture: ComponentFixture<PanelModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
