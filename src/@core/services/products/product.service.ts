import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ValueClass } from 'src/@core/interfaces/valueclass.interface';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/@core/interfaces/product.interface';
import { API } from 'src/@core/config/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API.HOST}/${API.PRODUCT.GET_ALL_PRODUCT}`);
  }

  getProduct(SanPhamID:number): Observable<Product>{
    return this.http.get<Product>(`${API.HOST}/${API.PRODUCT.GET_PRODUCT_BY_ID}?id=${SanPhamID}`)
  }

  // thay đổi trạng thái khi click coffee-tea-special trên slide
  onCoffee() {
    return new Observable<ValueClass>(subscriber => {
      const _valClass: ValueClass = {
        classCoffee: 'item item-coffee',
        classTea: 'item',
        classSpecial: 'item',
        classDessert: 'item',
      };
      subscriber.next(_valClass);
      subscriber.complete();
    });
  }
  onTea() {
    return new Observable<ValueClass>(subscriber => {
      const _valClass: ValueClass = {
        classCoffee: 'item',
        classTea: 'item item-coffee',
        classSpecial: 'item',
        classDessert: 'item',
      };
      subscriber.next(_valClass);
      subscriber.complete();
    });
  }
  onSpecial() {
    return new Observable<ValueClass>(subscriber => {
      const _valClass: ValueClass = {
        classCoffee: 'item',
        classTea: 'item',
        classSpecial: 'item item-coffee',
        classDessert: 'item',
      };
      subscriber.next(_valClass);
      subscriber.complete();
    });
  }
  onDessert() {
    return new Observable<ValueClass>(subscriber => {
      const _valClass: ValueClass = {
        classCoffee: 'item',
        classTea: 'item',
        classSpecial: 'item',
        classDessert: 'item item-coffee',
      };
      subscriber.next(_valClass);
      subscriber.complete();
    });
  }
}
