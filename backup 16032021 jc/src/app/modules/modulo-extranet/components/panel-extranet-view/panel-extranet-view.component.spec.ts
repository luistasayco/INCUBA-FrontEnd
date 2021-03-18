import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExtranetViewComponent } from './panel-extranet-view.component';

describe('PanelExtranetViewComponent', () => {
  let component: PanelExtranetViewComponent;
  let fixture: ComponentFixture<PanelExtranetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExtranetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExtranetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
