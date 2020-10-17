import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEquipoCreateOffLineComponent } from './registro-equipo-create-off-line.component';

describe('RegistroEquipoCreateOffLineComponent', () => {
  let component: RegistroEquipoCreateOffLineComponent;
  let fixture: ComponentFixture<RegistroEquipoCreateOffLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEquipoCreateOffLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEquipoCreateOffLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
