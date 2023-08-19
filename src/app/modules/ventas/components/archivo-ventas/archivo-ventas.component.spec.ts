import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoVentasComponent } from './archivo-ventas.component';

describe('ArchivoVentasComponent', () => {
  let component: ArchivoVentasComponent;
  let fixture: ComponentFixture<ArchivoVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivoVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
