import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoTipoListComponent } from './gasto-tipo-list.component';

describe('GastoTipoListComponent', () => {
  let component: GastoTipoListComponent;
  let fixture: ComponentFixture<GastoTipoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoTipoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoTipoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
