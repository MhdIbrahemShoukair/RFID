import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRFIDDataComponent } from './device-rfiddata.component';

describe('DeviceRFIDDataComponent', () => {
  let component: DeviceRFIDDataComponent;
  let fixture: ComponentFixture<DeviceRFIDDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceRFIDDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceRFIDDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
