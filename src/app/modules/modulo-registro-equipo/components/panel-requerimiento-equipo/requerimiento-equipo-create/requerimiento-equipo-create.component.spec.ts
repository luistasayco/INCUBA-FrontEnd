import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoEquipoCreateComponent } from './requerimiento-equipo-create.component';

describe('RequerimientoEquipoCreateComponent', () => {
  let component: RequerimientoEquipoCreateComponent;
  let fixture: ComponentFixture<RequerimientoEquipoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimientoEquipoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoEquipoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
