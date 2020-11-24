import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtranetCreateComponent } from './extranet-create.component';

describe('ExtranetCreateComponent', () => {
  let component: ExtranetCreateComponent;
  let fixture: ComponentFixture<ExtranetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtranetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtranetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
