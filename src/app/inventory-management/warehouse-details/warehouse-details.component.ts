import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { StockItem, Warehouse } from '../../services/inventory-service/inventory';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-warehouse-details',
  imports: [MatTableModule, TranslateModule, CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule],
  templateUrl: './warehouse-details.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './warehouse-details.component.scss'
})
export class WarehouseDetailsComponent {
  lang: any;
  dataSource: Warehouse[] = [];
  itemDetails: Warehouse = {
    WAREHOUSE_CODE: '',
    WAREHOUSE_NAME: '',
    LOCATION: '',
    COUNTRY: '',
    CITY: '',
    ZONE_: '',
    STREET: '',
    BULIDING: '',
    POSTAL_CODE: ''
  };
  itemId: string | null = '';

  listDataSource: StockItem[] = [];
  filteredResults: StockItem[] = [];
  filteredResultsDS: any;
  codes: { lots: { name: string, stock: number, expDate: string }[], code: string }[] = [];

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;

  distinctCodes: (string | undefined)[] = [];
  selectedCode: string[] = [];
  distinctSerials: (string | undefined)[] = [];
  selectedSerial: string[] = [];

  displayedColumns: string[] = ['id', 'serial', 'lot', 'expiration_date', 'quantity'];

  selectOptionStyle = 'background-color: white;font-size: 14px;width: 240px;';

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
  }

  private loadData() {
    this.inventoryService.getWarehouseDetailsByCode(this.itemId as string).subscribe((item) => {
      this.itemDetails = item;
    });
    this.inventoryService.getStockItemsByCode(this.itemId as string).subscribe((item) => {
      this.listDataSource = item;
      this.updateFilteredResults();
      this.getPreSelectedValues();
      this.prepareSummary();
    });
  }

  public updateFilteredResults() {
    this.filteredResults = this.listDataSource;
    if (!!this.selectedCode && this.selectedCode.length != 0) {
      this.filteredResults = this.filteredResults.filter(f => this.selectedCode?.includes(f.ITEM_CODE));
    }
    if (!!this.selectedSerial && this.selectedSerial.length != 0) {
      this.filteredResults = this.filteredResults.filter(f => this.selectedSerial?.includes(f.SERIAL_NUMBER as string));
    }


    this.filteredResultsDS = new MatTableDataSource(this.filteredResults);
    this.filteredResultsDS.paginator = this.paginator;
    this.filteredResultsDS.sort = this.sort;
  }

  groupBy(array: any[], key: string) {
    return array.reduce((result, currentItem) => {
      (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
      return result;
    }, {});
  }

  prepareSummary() {
    const grpA = this.groupBy(this.filteredResults, 'ITEM_CODE');
    this.codes = Object.entries(grpA).map(([itemCode, items]) => {
      const typedItems = items as any[];
      const groupedLots = this.groupBy(typedItems, 'LOT_NUMBER');
      const lots = Object.entries(groupedLots).map(([lotNumber, lotItems]) => {
        const typedLotItems = lotItems as { ONHAND_QUANTITY: number, EXPIRATION_DATE: string }[];
        return {
          name: lotNumber,
          stock: typedLotItems[0]?.ONHAND_QUANTITY || 0,
          expDate: typedLotItems[0]?.EXPIRATION_DATE || ''
        };
      });
      return { code: itemCode, lots };
    });
  }

  public clearFilter(filterInput: string) {
    switch (filterInput) {
      case 'ITEM_CODE':
        this.selectedCode = [];
        break;
      case 'SERIAL_NUMBER':
        this.selectedSerial = [];
        break;
    }

    this.updateFilteredResults();
  }

  private getPreSelectedValues() {
    this.distinctSerials = Array.from(new Set(this.listDataSource.map(item => item.SERIAL_NUMBER)));
    this.distinctCodes = Array.from(new Set(this.listDataSource.map(item => item.ITEM_CODE)));
  }
}
