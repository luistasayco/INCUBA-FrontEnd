import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVisorComponent } from './panel-visor.component';

describe('PanelVisorComponent', () => {
  let component: PanelVisorComponent;
  let fixture: ComponentFixture<PanelVisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
