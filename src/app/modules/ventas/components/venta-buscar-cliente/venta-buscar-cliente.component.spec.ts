import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaBuscarClienteComponent } from './venta-buscar-cliente.component';

describe('VentaBuscarClienteComponent', () => {
  let component: VentaBuscarClienteComponent;
  let fixture: ComponentFixture<VentaBuscarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaBuscarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaBuscarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
