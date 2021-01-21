import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunaCreateComponent } from './vacuna-create.component';

describe('VacunaCreateComponent', () => {
  let component: VacunaCreateComponent;
  let fixture: ComponentFixture<VacunaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
