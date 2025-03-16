import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';


export interface PeriodicElement {
  id: string;
  type: string;
  status: string;
  errorMsg: string;
  action?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 'R-21332', type: 'Reader', status: 'Offline', errorMsg: 'Failed to get Puls Info' },
  { id: 'AN-3241', type: 'Antenna', status: 'Offline', errorMsg: 'No response from Antenna' },
  { id: 'T-21332', type: 'RFID Tag', status: 'Outside designated zone', errorMsg: 'Tag showing outside designated zone' },
  { id: 'R-53452', type: 'Reader', status: 'Offline', errorMsg: 'Failed to get Puls Info' },
];


@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumns: string[] = ['id', 'type', 'status', 'errorMsg', 'action'];
  dataSource = ELEMENT_DATA;

}
