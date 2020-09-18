import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEquipoUpdateComponent } from './registro-equipo-update.component';

describe('RegistroEquipoUpdateComponent', () => {
  let component: RegistroEquipoUpdateComponent;
  let fixture: ComponentFixture<RegistroEquipoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEquipoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEquipoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
