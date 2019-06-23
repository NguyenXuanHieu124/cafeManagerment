import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/@core/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TableOrderService {
    private products = new BehaviorSubject<Product[]>([]);
    private newOrders = new BehaviorSubject<Product[]>([]);
    private ordering = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient) { }

    // thêm sản phẩm vào giỏ
    addTableOrders(product: Product) {
        const orders = this.products.getValue();
        const index = orders.findIndex(x => x.SanPhamID === product.SanPhamID);
        if (index !== -1) { // Đã tồn tại sản phẩm rồi
            orders[index].SoLuong++;
        } else {
            if (product.SoLuong > 0) {
                orders.push(product);
            } else {
                this.setNewOrder(product); // them 1 sp moi chua dc order vao mang
                product.SoLuong = 1;
                orders.push(product);
            }
        }
        const obj = this.totalMoney(orders); // tinh tien va so luong order
        this.ordering.next(obj);
        this.products.next(orders);
    }
    // giảm sản phẩm từ giỏ
    reductionTableOrder(product: Product) {
        const orders = this.products.getValue();
        const index = orders.findIndex(x => x.SanPhamID === product.SanPhamID);
        if (index !== -1) { // tim thay
            orders[index].SoLuong--;
            if (orders[index].SoLuong === 0) {
                orders.splice(index, 1); // xóa 1 phần tử trong mảng
            }
        }
        const obj = this.totalMoney(orders); // tinh tien va so luong order
        this.ordering.next(obj);
        this.products.next(orders);
    }

    totalMoney(products: Product[]) {
        let payment: number = 0;
        let quantity: number = 0;
        for (let item of products) {
            payment += (item.Gia * item.SoLuong);
            quantity += item.SoLuong;
        }
        // obj chứa số lượng order + số tiền phải thanh toán
        const _ordering = {
            quantity: quantity,
            totalPayment: payment
        };
        return _ordering;
    }
    // lấy thông tin order (số lượng món + số tiền)
    getOrderingInfo() {
        return this.ordering.asObservable();
    }

    // lấy thông tin hiện tại trong giỏ hàng
    getTableOrders() {
        return this.products.asObservable();
    }

    setNewOrder(newOrder: Product) {
        const orders = this.newOrders.getValue();
        orders.push(newOrder);
        this.newOrders.next(orders);
    }

    getNewOrder() {
        return this.newOrders.asObservable();
    }

    onDestroyNewOrders() {
        this.newOrders.next([]);
    }

    destroyTableOrders() {
        this.products.next([]);
        this.ordering.next(0);
    }
}
