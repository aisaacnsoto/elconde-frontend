import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCreateComponent } from './servicio-create.component';

describe('ServicioCreateComponent', () => {
  let component: ServicioCreateComponent;
  let fixture: ComponentFixture<ServicioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
