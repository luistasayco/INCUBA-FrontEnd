import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFirmaDigitalComponent } from './panel-firma-digital.component';

describe('PanelFirmaDigitalComponent', () => {
  let component: PanelFirmaDigitalComponent;
  let fixture: ComponentFixture<PanelFirmaDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelFirmaDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelFirmaDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
