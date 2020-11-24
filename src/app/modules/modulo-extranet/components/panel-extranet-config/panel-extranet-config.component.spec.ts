import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExtranetConfigComponent } from './panel-extranet-config.component';

describe('PanelExtranetConfigComponent', () => {
  let component: PanelExtranetConfigComponent;
  let fixture: ComponentFixture<PanelExtranetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExtranetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExtranetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
