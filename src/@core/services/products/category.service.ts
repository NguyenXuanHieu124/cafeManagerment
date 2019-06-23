import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../../config/api';
import { Product } from '../../interfaces/product.interface';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { CTHD } from 'src/@core/interfaces/billdetail.interface';
import { mergeMap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private reductionOdered = new BehaviorSubject<any[]>([]);
    constructor(private http: HttpClient) { }

    _getProductByCategory(CategoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${API.HOST}/${API.PRODUCT.GET_ALL_PRODUCT_BY_CATEGORYID}?id=${CategoryId}`)
    }

    getProductOrdered(params: number) {
        return this.http.get<Product[]>(`${API.HOST}/${API.PRODUCT.GET_ALL_PRODUCT}`).pipe(mergeMap((data: Product[]) => {
            return this.http.get<Bill>(`${API.HOST}/${API.BILLS.GET_BY_ID_TABLE}?id=${params}`).pipe(
                mergeMap((bill) => {
                    // handle cho này là có bill va data
                    return this.http.get<CTHD[]>(`${API.HOST}/${API.CTHD.GET_CTHD_BY_HDX_ID}?id=${bill.HoaDonXuatID}`).pipe(
                        map((bill_detail) => {
                            const _objects = [];
                            for (let item of data) {
                                for (let x of bill_detail) {
                                    if (x.SanPhamID === item.SanPhamID) {
                                        item.SoLuong = x.SoLuong;
                                        let object = {
                                            SanPhamId: item.SanPhamID,
                                            SoLuong: item.SoLuong
                                        } // lấy id + SL của sp cho TH không cho phép trừ quá số lượng sp đã order trên server
                                        _objects.push(object);
                                    }
                                }
                            }
                            this.reductionOdered.next(_objects); // cap nhat sl sp order
                            return data;
                        })
                    )
                }),
                catchError((err) => {
                    let arrData = [];
                    arrData.push(data);
                    return arrData;
                }));
        }));
    }

    getByCategory(CategoryId: number, params?: number) {
        return this.http.get<Product[]>(`${API.HOST}/${API.PRODUCT.GET_ALL_PRODUCT_BY_CATEGORYID}?id=${CategoryId}`).pipe(mergeMap((data: Product[]) => {
            return this.http.get<Bill>(`${API.HOST}/${API.BILLS.GET_BY_ID_TABLE}?id=${params}`).pipe(
                mergeMap((bill) => {
                    return this.http.get<CTHD[]>(`${API.HOST}/${API.CTHD.GET_CTHD_BY_HDX_ID}?id=${bill.HoaDonXuatID}`).pipe(
                        map(billDetail => {
                            for (let item of data) {
                                for (let x of billDetail) {
                                    if (x.SanPhamID === item.SanPhamID) {
                                        item.SoLuong = x.SoLuong;
                                    }
                                }
                            }
                            return data;
                        })
                    )
                }),
                catchError((err) => {
                    let arrayData = [];
                    arrayData.push(data);
                    return arrayData;
                })
            )
        }));

    }

    // Lấy thông tin sản phẩm theo thể loại => MenuComponent
    getProductByCategoryMenu(CategoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${API.HOST}/${API.PRODUCT.GET_ALL_PRODUCT_BY_CATEGORYID}?id=${CategoryId}`);
    }

    destroyReductionOrder() {
        this.reductionOdered.next([]);
    }
    returnReductionOrder() {
        return this.reductionOdered.asObservable();
    }
}

