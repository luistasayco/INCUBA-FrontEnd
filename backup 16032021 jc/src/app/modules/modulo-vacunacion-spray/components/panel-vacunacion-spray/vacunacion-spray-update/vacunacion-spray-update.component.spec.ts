import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSprayUpdateComponent } from './vacunacion-spray-update.component';

describe('VacunacionSprayUpdateComponent', () => {
  let component: VacunacionSprayUpdateComponent;
  let fixture: ComponentFixture<VacunacionSprayUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSprayUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSprayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
