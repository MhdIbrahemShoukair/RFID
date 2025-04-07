import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


export interface ErrorNotifications {
  id: string;
  type: string;
  status: string;
  errorMsg: string;
  action?: string;
}

const ELEMENT_DATA: ErrorNotifications[] = [
  { id: 'R-21332', type: 'Reader', status: 'Offline', errorMsg: 'Failed to get Puls Info' },
  { id: 'AN-3241', type: 'Antenna', status: 'Offline', errorMsg: 'No response from Antenna' },
  { id: 'T-21332', type: 'RFID Tag', status: 'Outside designated zone', errorMsg: 'Tag showing outside designated zone' },
  { id: 'R-53452', type: 'Reader', status: 'Offline', errorMsg: 'Failed to get Puls Info' },
];


@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'status', 'errorMsg', 'action'];
  dataSource = ELEMENT_DATA;
  lang: any;

  constructor(private translate: TranslateService) {
    this.lang = localStorage.getItem('lang')
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((lng) => {
      this.lang = lng.lang;
    });
  }
}
