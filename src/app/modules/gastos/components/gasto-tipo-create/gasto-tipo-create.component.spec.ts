import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoTipoCreateComponent } from './gasto-tipo-create.component';

describe('GastoTipoCreateComponent', () => {
  let component: GastoTipoCreateComponent;
  let fixture: ComponentFixture<GastoTipoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoTipoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoTipoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
