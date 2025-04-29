import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { InventoryItem, MOCK_INVENTORY } from '../../services/inventory-service/inventory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-inventory-list',
  imports: [MatTableModule, TranslateModule, RouterLink, CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './inventory-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
  displayedColumns: string[] = ['id', 'hsn', 'reference', 'name', 'tagId', 'category', 'action'];
  dataSource: InventoryItem[] = [];
  filteredResults: InventoryItem[] = [];
  lang: any;
  selectOptionStyle = 'background-color: white;font-size: 14px;width: 240px;';

  distinctHSNs: (string | undefined)[] = [];
  selectedHSN: (string)[] = [];
  distinctCodes: (string | undefined)[] = [];
  selectedCode: string[] = [];
  distinctCategories: (string | undefined)[] = [];
  selectedCategorie: (string)[] = [];
  distinctClassifications: (string | undefined)[] = [];
  selectedClassification: (string)[] = [];

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
    this.getPreSelectedValues();
    this.updateFilteredResults();
  }

  public updateFilteredResults() {
    this.filteredResults = this.dataSource;
    console.log('this.selectedCode', this.selectedCode);
    if (!!this.selectedCode && this.selectedCode.length != 0) {
      this.filteredResults = this.filteredResults.filter(f => this.selectedCode?.includes(f.ITEM_CODE));
    }
    if (!!this.selectedHSN && this.selectedHSN.length != 0) {
      this.filteredResults = this.filteredResults.filter(f => this.selectedHSN?.includes(f.HSN_CODE as string));
    }
    if (!!this.selectedCategorie && this.selectedCategorie.length != 0) {
      this.filteredResults = this.filteredResults.filter(f => this.selectedCategorie?.includes(f.ITEM_CATEGORY));
    }
    if (!!this.selectedClassification && this.selectedClassification.length != 0) {
      this.filteredResults = this.filteredResults.filter(f => this.selectedClassification?.includes(f.ITEM_CLASSIFICATION));
    }
  }

  public clearFilter(filterInput: string) {
    switch (filterInput) {
      case 'ITEM_CODE':
        this.selectedCode = [];
        break;
      case 'HSN_CODE':
        this.selectedHSN = [];
        break;
      case 'ITEM_CATEGORY':
        this.selectedCategorie = [];
        break;
      case 'ITEM_CLASSIFICATION':
        this.selectedClassification = [];
        break;
    }

    this.updateFilteredResults();
  }

  private getPreSelectedValues() {
    this.distinctHSNs = Array.from(new Set(this.dataSource.map(item => item.HSN_CODE)));
    this.distinctCodes = Array.from(new Set(this.dataSource.map(item => item.ITEM_CODE)));
    this.distinctCategories = Array.from(new Set(this.dataSource.map(item => item.ITEM_CATEGORY)));
    this.distinctClassifications = Array.from(new Set(this.dataSource.map(item => item.ITEM_CLASSIFICATION)));
  }
  private loadWarehouseData() {
    this.inventoryService.getWarehouseDetails().subscribe((items) => {
      console.log(items);
    })
  }
}
