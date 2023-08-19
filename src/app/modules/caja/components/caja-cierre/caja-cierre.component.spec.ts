import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaCierreComponent } from './caja-cierre.component';

describe('CajaCierreComponent', () => {
  let component: CajaCierreComponent;
  let fixture: ComponentFixture<CajaCierreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaCierreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
