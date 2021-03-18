import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSubcutaneaOfflineUpdateComponent } from './vacunacion-subcutanea-offline-update.component';

describe('VacunacionSubcutaneaOfflineUpdateComponent', () => {
  let component: VacunacionSubcutaneaOfflineUpdateComponent;
  let fixture: ComponentFixture<VacunacionSubcutaneaOfflineUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSubcutaneaOfflineUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSubcutaneaOfflineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
