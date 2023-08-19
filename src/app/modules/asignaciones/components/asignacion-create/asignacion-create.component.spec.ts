import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionCreateComponent } from './asignacion-create.component';

describe('AsignacionCreateComponent', () => {
  let component: AsignacionCreateComponent;
  let fixture: ComponentFixture<AsignacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
