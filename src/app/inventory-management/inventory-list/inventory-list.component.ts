import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface ErrorNotifications {
  id: string;
  sku: string;
  reference: string;
  name: string;
  tagId: string;
  action?: string;
}

const ELEMENT_DATA: ErrorNotifications[] = [
  { id: 'R-21332', sku: 'WJ-1234-M', name: 'Wheat', reference: '398624', tagId: '223-12334' },
  { id: 'AN-3241', sku: 'WJ-1234-M', name: 'Rice', reference: '398634', tagId: '' },
  { id: 'T-21332', sku: 'WJ-1234-M', name: 'Olive Oil tier 1', reference: '392621', tagId: '223-18767' },
  { id: 'R-53452', sku: 'WJ-1234-M', name: 'Olive Oil tier 2', reference: '398626', tagId: '331-77435' },
];

@Component({
  selector: 'app-inventory-list',
  imports: [MatTableModule, TranslateModule, RouterLink],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
  displayedColumns: string[] = ['id', 'sku', 'reference', 'name', 'tagId', 'action'];
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
