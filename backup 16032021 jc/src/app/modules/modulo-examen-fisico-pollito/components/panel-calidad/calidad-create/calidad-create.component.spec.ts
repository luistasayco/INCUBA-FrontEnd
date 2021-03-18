import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadCreateComponent } from './calidad-create.component';

describe('CalidadCreateComponent', () => {
  let component: CalidadCreateComponent;
  let fixture: ComponentFixture<CalidadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
