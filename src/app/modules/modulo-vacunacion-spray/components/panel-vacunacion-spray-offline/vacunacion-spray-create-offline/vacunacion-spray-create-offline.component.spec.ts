import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSprayCreateOfflineComponent } from './vacunacion-spray-create-offline.component';

describe('VacunacionSprayCreateOfflineComponent', () => {
  let component: VacunacionSprayCreateOfflineComponent;
  let fixture: ComponentFixture<VacunacionSprayCreateOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSprayCreateOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSprayCreateOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
