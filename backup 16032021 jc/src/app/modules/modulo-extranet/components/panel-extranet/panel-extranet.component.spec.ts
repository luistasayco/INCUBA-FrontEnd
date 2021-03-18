import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExtranetComponent } from './panel-extranet.component';

describe('PanelExtranetComponent', () => {
  let component: PanelExtranetComponent;
  let fixture: ComponentFixture<PanelExtranetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExtranetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExtranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
