import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSubcutaneaCreateComponent } from './vacunacion-subcutanea-create.component';

describe('VacunacionSubcutaneaCreateComponent', () => {
  let component: VacunacionSubcutaneaCreateComponent;
  let fixture: ComponentFixture<VacunacionSubcutaneaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSubcutaneaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSubcutaneaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
