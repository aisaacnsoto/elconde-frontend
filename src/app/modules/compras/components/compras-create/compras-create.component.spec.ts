import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasCreateComponent } from './compras-create.component';

describe('ComprasCreateComponent', () => {
  let component: ComprasCreateComponent;
  let fixture: ComponentFixture<ComprasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
