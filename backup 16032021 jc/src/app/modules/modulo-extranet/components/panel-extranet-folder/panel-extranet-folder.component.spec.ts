import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExtranetFolderComponent } from './panel-extranet-folder.component';

describe('PanelExtranetFolderComponent', () => {
  let component: PanelExtranetFolderComponent;
  let fixture: ComponentFixture<PanelExtranetFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExtranetFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExtranetFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
