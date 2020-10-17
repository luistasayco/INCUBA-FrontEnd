import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEquipoUpdateOffLineComponent } from './registro-equipo-update-off-line.component';

describe('RegistroEquipoUpdateOffLineComponent', () => {
  let component: RegistroEquipoUpdateOffLineComponent;
  let fixture: ComponentFixture<RegistroEquipoUpdateOffLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEquipoUpdateOffLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEquipoUpdateOffLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
