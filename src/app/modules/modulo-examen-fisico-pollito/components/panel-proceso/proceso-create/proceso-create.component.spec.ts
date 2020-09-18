import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoCreateComponent } from './proceso-create.component';

describe('ProcesoCreateComponent', () => {
  let component: ProcesoCreateComponent;
  let fixture: ComponentFixture<ProcesoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
