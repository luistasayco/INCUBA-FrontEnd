import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganoComponent } from './create-organo.component';

describe('CreateOrganoComponent', () => {
  let component: CreateOrganoComponent;
  let fixture: ComponentFixture<CreateOrganoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
