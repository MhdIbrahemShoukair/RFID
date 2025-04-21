import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { InventoryItem, MOCK_INVENTORY } from '../../services/inventory-service/inventory';

@Component({
  selector: 'app-inventory-list',
  imports: [MatTableModule, TranslateModule, RouterLink],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
  displayedColumns: string[] = ['id', 'hsn', 'reference', 'name', 'tagId', 'category', 'action'];
  dataSource: InventoryItem[] = [];
  lang: any;

  constructor(private translate: TranslateService, private inventoryService: InventoryService) {
    this.lang = localStorage.getItem('lang')
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((lng) => {
      this.lang = lng.lang;
    });
    this.loadData();
    this.loadWarehouseData();
  }

  private loadData() {
    // this.inventoryService.getInventoryItems().subscribe((items) => {
    //   this.dataSource = items;
    //   console.log(this.dataSource);
    // })
    this.dataSource = MOCK_INVENTORY.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM as any;
  }
  private loadWarehouseData() {
    this.inventoryService.getWarehouseDetails().subscribe((items) => {
      console.log(items);
    })
  }
}
