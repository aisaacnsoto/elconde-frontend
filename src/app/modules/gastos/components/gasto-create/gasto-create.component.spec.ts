import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoCreateComponent } from './gasto-create.component';

describe('GastoCreateComponent', () => {
  let component: GastoCreateComponent;
  let fixture: ComponentFixture<GastoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
