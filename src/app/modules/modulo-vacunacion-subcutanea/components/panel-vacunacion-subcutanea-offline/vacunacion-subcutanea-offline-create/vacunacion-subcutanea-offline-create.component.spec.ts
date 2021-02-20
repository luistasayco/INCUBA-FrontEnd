import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSubcutaneaOfflineCreateComponent } from './vacunacion-subcutanea-offline-create.component';

describe('VacunacionSubcutaneaOfflineCreateComponent', () => {
  let component: VacunacionSubcutaneaOfflineCreateComponent;
  let fixture: ComponentFixture<VacunacionSubcutaneaOfflineCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSubcutaneaOfflineCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSubcutaneaOfflineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
