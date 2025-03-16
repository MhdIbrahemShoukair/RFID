import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'navbar-h',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar-h.component.html',
  styleUrl: './navbar-h.component.scss'
})
export class NavbarHComponent implements OnInit {
  routes: { path: string; name: string; order: number; }[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // debugger
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.routes = this.router.config
        .filter(route => route.data && route.data['name'])
        .map(route => ({ path: route.path, name: route?.data?.['name'], order: route?.data?.['order'] }))
        .sort((n1, n2) => { return n1.order > n2.order ? 1 : -1 }) as any; // | '' as any 

      console.log(this.routes);
    });
  }
}