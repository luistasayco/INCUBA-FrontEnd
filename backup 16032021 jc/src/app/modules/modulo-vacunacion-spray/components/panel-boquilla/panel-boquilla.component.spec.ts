import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBoquillaComponent } from './panel-boquilla.component';

describe('PanelBoquillaComponent', () => {
  let component: PanelBoquillaComponent;
  let fixture: ComponentFixture<PanelBoquillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBoquillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBoquillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
