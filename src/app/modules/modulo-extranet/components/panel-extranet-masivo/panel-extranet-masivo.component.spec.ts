import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExtranetMasivoComponent } from './panel-extranet-masivo.component';

describe('PanelExtranetMasivoComponent', () => {
  let component: PanelExtranetMasivoComponent;
  let fixture: ComponentFixture<PanelExtranetMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExtranetMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExtranetMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
