import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoTileComponent } from './producto-tile.component';

describe('ProductoTileComponent', () => {
  let component: ProductoTileComponent;
  let fixture: ComponentFixture<ProductoTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
