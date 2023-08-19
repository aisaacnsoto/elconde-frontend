import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaAperturaComponent } from './caja-apertura.component';

describe('CajaAperturaComponent', () => {
  let component: CajaAperturaComponent;
  let fixture: ComponentFixture<CajaAperturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaAperturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaAperturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
