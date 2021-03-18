import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExplotacionCreateComponent } from './tipo-explotacion-create.component';

describe('TipoExplotacionCreateComponent', () => {
  let component: TipoExplotacionCreateComponent;
  let fixture: ComponentFixture<TipoExplotacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoExplotacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExplotacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
