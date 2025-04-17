import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inventory-management',
  imports: [RouterOutlet, TranslateModule, RouterLink, CommonModule, MatIconModule],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.scss'
})
export class InventoryManagementComponent {
  lang: any;
  inDetails: boolean = false;

  constructor(private translate: TranslateService, private router: Router) {
    this.lang = localStorage.getItem('lang')
    this.inDetails = this.router.url.includes('details');
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((lng) => {
      this.lang = lng.lang;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.inDetails = this.router.url.includes('details');
      }
    });
  }
}
