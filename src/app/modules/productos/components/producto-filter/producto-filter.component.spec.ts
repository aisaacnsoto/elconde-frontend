import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFilterComponent } from './producto-filter.component';

describe('ProductoFilterComponent', () => {
  let component: ProductoFilterComponent;
  let fixture: ComponentFixture<ProductoFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
