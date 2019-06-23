import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/@core/config/api';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BillService {
    constructor(private http: HttpClient) { }

    createBill(bill: Bill): Observable<Bill> {
        return this.http.post<Bill>(`${API.HOST}/${API.BILLS.CREATE_BILL}`, bill);
    }
    updateBill(bill: Bill): Observable<Bill> {
        return this.http.put<Bill>(`${API.HOST}/${API.BILLS.UPDATE_BILL}`, bill);
    }

    getBillByIdTable(tableId: number): Observable<Bill> {
        return this.http.get<Bill>(`${API.HOST}/${API.BILLS.GET_BY_ID_TABLE}?id=${tableId}`);
    }

    getBillByStt(): Observable<Bill[]> {
        return this.http.get<Bill[]>(`${API.HOST}/${API.BILLS.GET_BILL_BY_STT}`)
    }
}