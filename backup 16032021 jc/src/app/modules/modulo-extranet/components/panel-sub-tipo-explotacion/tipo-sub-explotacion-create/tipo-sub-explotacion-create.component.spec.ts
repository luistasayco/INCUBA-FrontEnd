import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSubExplotacionCreateComponent } from './tipo-sub-explotacion-create.component';

describe('TipoSubExplotacionCreateComponent', () => {
  let component: TipoSubExplotacionCreateComponent;
  let fixture: ComponentFixture<TipoSubExplotacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSubExplotacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSubExplotacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
