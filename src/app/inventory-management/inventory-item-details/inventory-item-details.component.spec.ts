import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemDetailsComponent } from './inventory-item-details.component';

describe('InventoryItemDetailsComponent', () => {
  let component: InventoryItemDetailsComponent;
  let fixture: ComponentFixture<InventoryItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryItemDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
