import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSubcutaneaUpdateComponent } from './vacunacion-subcutanea-update.component';

describe('VacunacionSubcutaneaUpdateComponent', () => {
  let component: VacunacionSubcutaneaUpdateComponent;
  let fixture: ComponentFixture<VacunacionSubcutaneaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSubcutaneaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSubcutaneaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
