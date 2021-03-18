import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionLimpiezaCreateComponent } from './condicion-limpieza-create.component';

describe('CondicionLimpiezaCreateComponent', () => {
  let component: CondicionLimpiezaCreateComponent;
  let fixture: ComponentFixture<CondicionLimpiezaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionLimpiezaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionLimpiezaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
