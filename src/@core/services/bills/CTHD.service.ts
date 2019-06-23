import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/@core/config/api';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { CTHD } from 'src/@core/interfaces/billdetail.interface';

@Injectable({
    providedIn: "root"
})
export class CTHDService {
    constructor(private http: HttpClient) { }

    createBillDetail(cthd: CTHD): Observable<CTHD>{
        return this.http.post<CTHD>(`${API.HOST}/${API.CTHD.CREATE_CTHD}`, cthd);
    }

    getBillDetailByBillId(HdxId: number): Observable<CTHD[]>{
        return this.http.get<CTHD[]>(`${API.HOST}/${API.CTHD.GET_CTHD_BY_HDX_ID}?id=${HdxId}`);
    }

    updateBilLDetail(billDetail: CTHD){
        return this.http.put<CTHD>(`${API.HOST}/${API.CTHD.UPDATE_BILL_DETAIL}`, billDetail);;
    }
}