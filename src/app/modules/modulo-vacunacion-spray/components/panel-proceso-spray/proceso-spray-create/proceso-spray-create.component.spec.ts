import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoSprayCreateComponent } from './proceso-spray-create.component';

describe('ProcesoSprayCreateComponent', () => {
  let component: ProcesoSprayCreateComponent;
  let fixture: ComponentFixture<ProcesoSprayCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoSprayCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoSprayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
