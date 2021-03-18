import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEquipoCreateComponent } from './registro-equipo-create.component';

describe('RegistroEquipoCreateComponent', () => {
  let component: RegistroEquipoCreateComponent;
  let fixture: ComponentFixture<RegistroEquipoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEquipoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEquipoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
