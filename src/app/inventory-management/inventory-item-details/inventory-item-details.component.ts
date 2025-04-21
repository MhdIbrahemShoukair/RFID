import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { InventoryItem, MOCK_INVENTORY } from '../../services/inventory-service/inventory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-item-details',
  imports: [TranslateModule],
  templateUrl: './inventory-item-details.component.html',
  styleUrl: './inventory-item-details.component.scss'
})
export class InventoryItemDetailsComponent {
  lang: any;
  dataSource: InventoryItem[] = [];
  itemDetails: InventoryItem = {
    ITEM_CODE: '',
    ITEM_DESCRIPTION: '',
    UNIT_OF_MEASUREMENT: '',
    ITEM_CATEGORY: '',
    ITEM_CLASSIFICATION: ''
  };
  itemId: string | null = '';

  constructor(private translate: TranslateService, private inventoryService: InventoryService, private route: ActivatedRoute) {
    this.lang = localStorage.getItem('lang')
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((lng) => {
      this.lang = lng.lang;
    });
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
    });
    this.loadData();
    // this.loadWarehouseData();

  }

  private loadData() {
    // this.inventoryService.getInventoryItems().subscribe((items) => {
    //   this.dataSource = items;
    //   console.log(this.dataSource);
    // })
    this.dataSource = MOCK_INVENTORY.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM as any;
    this.itemDetails = this.dataSource.filter(i => i.ITEM_CODE === this.itemId)[0];
  }
}
