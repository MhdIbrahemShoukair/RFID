import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DeviceManagmentComponent } from './device-managment/device-managment.component';
import { DeviceListComponent } from './device-managment/device-list/device-list.component';
import { DeviceDetailsComponent } from './device-managment/device-details/device-details.component';
import { DeviceRFIDDataComponent } from './device-managment/device-rfiddata/device-rfiddata.component';
import { AuthGuard } from './services/auth-service/auth.guard';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { InventoryItemDetailsComponent } from './inventory-management/inventory-item-details/inventory-item-details.component';
import { InventoryListComponent } from './inventory-management/inventory-list/inventory-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { name: 'login', order: 10 } },
    {
        path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
        data: { name: 'dashboard', order: 1 },
        canActivate: [AuthGuard]
    },
    {
        path: 'devices', component: DeviceManagmentComponent, data: { name: 'devices', order: 2 },
        children: [
            {
                path: 'list',
                component: DeviceListComponent
            },
            {
                path: 'details/:id',
                component: DeviceDetailsComponent
            },
            {
                path: 'details/:id/RFID',
                component: DeviceRFIDDataComponent
            },
            // {
            //     path: '', redirectTo 'list', pathMatch: 'full'
            // }
        ]

    },
    {
        path: 'Inventory', component: InventoryManagementComponent, data: { name: 'inventory', order: 3 },
        children: [
            {
                path:'', redirectTo:'item-list', pathMatch:'full'
            },
            {
                path: 'item-list',
                component: InventoryListComponent
            },
            {
                path: 'item-details/:id',
                component: InventoryItemDetailsComponent
            },
            // {
            //     path: 'details/:id/RFID',
            //     component: DeviceRFIDDataComponent
            // },
            // {
            //     path: '', redirectTo 'list', pathMatch: 'full'
            // }
        ]

    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];
export class AppRoutingModule { }