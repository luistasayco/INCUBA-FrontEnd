import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrganoComponent } from './panel-organo.component';

describe('PanelOrganoComponent', () => {
  let component: PanelOrganoComponent;
  let fixture: ComponentFixture<PanelOrganoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOrganoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
