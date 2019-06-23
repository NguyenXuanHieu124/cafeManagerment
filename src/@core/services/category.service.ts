import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../config/api';
import { Product } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private htttp: HttpClient) { }

    getByCategory(CategoryId: number): Observable<Product[]> {
        return this.htttp.get<Product[]>(`${API.HOST}/${API.PRODUCT.GET_ALL_PRODUCT_BY_CATEGORYID}/?id=${CategoryId}`);
    }
}

