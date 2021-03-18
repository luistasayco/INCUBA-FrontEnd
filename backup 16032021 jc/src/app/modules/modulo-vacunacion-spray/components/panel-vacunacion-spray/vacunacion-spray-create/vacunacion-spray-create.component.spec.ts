import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionSprayCreateComponent } from './vacunacion-spray-create.component';

describe('VacunacionSprayCreateComponent', () => {
  let component: VacunacionSprayCreateComponent;
  let fixture: ComponentFixture<VacunacionSprayCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunacionSprayCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionSprayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
