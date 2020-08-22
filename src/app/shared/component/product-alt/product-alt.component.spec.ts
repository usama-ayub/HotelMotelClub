import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAltComponent } from './product-alt.component';

describe('ProductAltComponent', () => {
  let component: ProductAltComponent;
  let fixture: ComponentFixture<ProductAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
