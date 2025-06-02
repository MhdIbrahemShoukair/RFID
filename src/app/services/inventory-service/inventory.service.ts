import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { InventoryItem, StockItem, Warehouse } from './inventory';

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
        var subject = new Subject<InventoryItem[]>();
        this.http.get<any>(`${this.BASE_URL}GetItemDetails`, this.httpOptions).subscribe((res) => {
            subject.next(res?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM);
        });
        return subject.asObservable();
    }

    getInventoryItemByCode(itemCode: string): Observable<InventoryItem> {
        var subject = new Subject<InventoryItem>();
        this.http.get<any>(`${this.BASE_URL}GetItemDetails?P_ITEM=${itemCode}`, this.httpOptions).subscribe((res) => {
            subject.next(res?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM[0]);
        });
        return subject.asObservable();
    }

    getStockItemsByCode(warehouseCode: string): Observable<StockItem[]> {
        var subject = new Subject<StockItem[]>();
        this.http.get<any>(`${this.BASE_URL}GetStockDetails?P_ORGANIZATION_CODE=${warehouseCode}`, this.httpOptions).subscribe((res) => {
            subject.next(res?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM);
        });
        return subject.asObservable();
    }

    getWarehouseDetails(): Observable<Warehouse[]> {
        var subject = new Subject<Warehouse[]>();
        this.http.get<any>(`${this.BASE_URL}GetWarehouseDetails`, this.httpOptions).subscribe((res) => {
            subject.next(res?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM);
        });
        return subject.asObservable();
    }

    getWarehouseDetailsByCode(warehouseCode: string): Observable<Warehouse> {
        var subject = new Subject<Warehouse>();
        this.http.get<any>(`${this.BASE_URL}GetWarehouseDetails?P_ORGANIZATION_CODE=${warehouseCode}`, this.httpOptions).subscribe((res) => {
            subject.next(res?.OutputParameters?.P_RECORD_STATUS?.P_RECORD_STATUS_ITEM[0]);
        });
        return subject.asObservable();
    }
}
