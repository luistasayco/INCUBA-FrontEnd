import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSprayUpdateOfflineComponent } from './vacunacion-spray-update-offline.component';

describe('VacunacionSprayUpdateOfflineComponent', () => {
  let component: VacunacionSprayUpdateOfflineComponent;
  let fixture: ComponentFixture<VacunacionSprayUpdateOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSprayUpdateOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSprayUpdateOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
