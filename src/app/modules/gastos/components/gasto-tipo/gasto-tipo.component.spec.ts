import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoTipoComponent } from './gasto-tipo.component';

describe('GastoTipoComponent', () => {
  let component: GastoTipoComponent;
  let fixture: ComponentFixture<GastoTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
