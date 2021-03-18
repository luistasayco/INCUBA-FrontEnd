import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoSubcutaneaCreateComponent } from './proceso-subcutanea-create.component';

describe('ProcesoSubcutaneaCreateComponent', () => {
  let component: ProcesoSubcutaneaCreateComponent;
  let fixture: ComponentFixture<ProcesoSubcutaneaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoSubcutaneaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoSubcutaneaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
