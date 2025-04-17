import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar-h',
  imports: [CommonModule, RouterLink, RouterModule, TranslateModule],
  templateUrl: './navbar-h.component.html',
  styleUrl: './navbar-h.component.scss'
})
export class NavbarHComponent implements OnInit {
  routes: { path: string; name: string; order: number; }[] = [];
  lang: any;

  constructor(private router: Router, private translate: TranslateService) {
    this.lang = this.translate.getBrowserLang();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.routes = this.router.config
        .filter(route => route.data && route.data['name'])
        .map(route => ({ path: route.path, name: route?.data?.['name'], order: route?.data?.['order'] }))
        .sort((n1, n2) => { return n1.order > n2.order ? 1 : -1 }) as any;
    });
    this.translate.onLangChange.subscribe((lng) => {
      this.lang = lng.lang;
    });
  };


  useLanguage(language: string): void {
    this.lang = language;
    this.translate.use(language);
    localStorage.setItem('lang', this.lang);
  }
}