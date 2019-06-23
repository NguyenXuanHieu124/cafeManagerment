import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Table } from 'src/@core/interfaces/table.interface';
import { API } from 'src/@core/config/api';
import { Product } from 'src/@core/interfaces/product.interface';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { CTHD } from 'src/@core/interfaces/billdetail.interface';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private products = new BehaviorSubject<Product[]>([]);
  private bills =new BehaviorSubject<Bill[]>([]);

  constructor(private http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${API.HOST}/${API.TABLE.GET_ALL_TABLE}`);
  }

  getTablesByStatus(status: number) {
    return this.http.get<Table[]>(`${API.HOST}/${API.TABLE.GET_ALL_TABLE_BY_STATUS}?status=${status}`);
  }

  getTablesOrder(status: number) {
    return this.http.get<Table[]>(`${API.HOST}/${API.TABLE.GET_ALL_TABLE_ORDER}?status=${status}`);
  }

  getTableById(idBan: number): Observable<Table> {
    return this.http.get<Table>(`${API.HOST}/${API.TABLE.GET_TABLE_BY_ID}?id=${idBan}`);
  }

  updateTable(table: Table): Observable<Table>{
    return this.http.put<Table>(`${API.HOST}/${API.TABLE.UPDATE_TABLE}`, table);
  }

}
