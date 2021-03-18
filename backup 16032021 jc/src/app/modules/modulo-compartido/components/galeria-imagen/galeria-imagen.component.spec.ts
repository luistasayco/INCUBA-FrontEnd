import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImagenComponent } from './galeria-imagen.component';

describe('GaleriaImagenComponent', () => {
  let component: GaleriaImagenComponent;
  let fixture: ComponentFixture<GaleriaImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
