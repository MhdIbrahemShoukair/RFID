import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { InventoryItem, Warehouse } from './inventory';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    env = environment.inventoryApiKeys;
    BTOA = environment.inventoryApiKeys.btoa;
    SUBSCRIPTION_KEY = environment.inventoryApiKeys.subscriptionKey;
    BASE_URL = environment.inventoryApiKeys.baseUrl;

    httpOptions = {
        'mode': 'no-cors',
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(environment.inventoryApiKeys.btoa),
            'Ocp-Apim-Subscription-Key': environment.inventoryApiKeys.subscriptionKey
        })
    };

    constructor(private http: HttpClient) { }

    getInventoryItems(): Observable<InventoryItem[]> {
        let items: InventoryItem[];
        var subject = new Subject<InventoryItem[]>();
        this.http.get<any[]>(`${this.BASE_URL}GetItemDetails`, this.httpOptions).subscribe((res) => {
            res.map(item => {
                items = item?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM;
                console.log(items);
                subject.next(items);
            });
        });
        return subject.asObservable();
    }
    
    getWarehouseDetails(): Observable<Warehouse[]> {
        let items: Warehouse[];
        var subject = new Subject<Warehouse[]>();
        this.http.get<any[]>(`${this.BASE_URL}GetWarehouseDetails`, this.httpOptions).subscribe((res) => {
            res.map(item => {
                items = item?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM;
                console.log(items);
                subject.next(items);
            });
        });
        return subject.asObservable();
    }
}
