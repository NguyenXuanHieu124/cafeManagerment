import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from 'src/@core/interfaces/table.interface';

@Injectable({
  providedIn: 'root'
})
export class TablesInfoService {

  private _id = new BehaviorSubject<number>(null); // gửi id từ view-order về header -> để header load lại đúng id của bàn vừa rồi
  private statusBack = new BehaviorSubject<boolean>(false); // bắt sự kiên view-order về orderlist => ko load lại onOrderingInfo tránh thêm sp lại
  private customer = new BehaviorSubject<string>(null);
  constructor() { }

  setTableId(id: number) {
    this._id.next(id);
  }
  getTableId() {
    return this._id.asObservable();
  }

  setClickedBack(status: boolean) {
    this.statusBack.next(status);
  }
  getClickedBack() {
    return this.statusBack.asObservable();
  }
  setCustomerName(customerName: string) {
    this.customer.next(customerName);
  }
  getCustomerName() {
    return this.customer.asObservable();
  }
}
