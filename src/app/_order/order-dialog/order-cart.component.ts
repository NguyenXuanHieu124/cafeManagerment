import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TablesService } from 'src/@core/services/table/tables.service';
import { Table } from 'src/@core/interfaces/table.interface';
import { TableOrderService } from 'src/@core/services/table/tb-order.service';
import { Product } from 'src/@core/interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { BillService } from 'src/@core/services/bills/bill.service';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { CTHDService } from 'src/@core/services/bills/CTHD.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-order-cart',
    templateUrl: './order-cart.component.html',
    styleUrls: ['./order-cart.component.scss']
})
export class OrderCartDialogComponent implements OnInit {
    tables: Table[];
    products: Product[];
    customerName = '';
    _totalPayment = 0;
    selected: number = 0;
    payment: number = 0;
    constructor(
        public dialogRef: MatDialogRef<OrderCartDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        private tableService: TablesService,
        private tbOrderService: TableOrderService,
        private billService: BillService,
        private CTHDService: CTHDService,
        private router: Router,

    ) { }

    ngOnInit() {
        // load data table theo trạng thái của bàn (load tất cả bàn có trạng thái # 1)
        this.tableService.getTablesByStatus(1).subscribe((data: Table[]) => this.tables = data);
        this.onTotalPayment();
        this.selected = this.data; // id bàn => hiển thị bàn theo id
        this.onGetBillByTableId();
    }

    onGetBillByTableId() {
        this.billService.getBillByIdTable(this.data).subscribe(data => {
            if (data) {
                this.customerName = data.TenKhachHang
            }
        }, (error) => {
            console.log(error);
            this.toastr.error('Chưa xử lý bàn chưa tồn tại')
        });
    }
    onTotalPayment() {
        this.tbOrderService.getTableOrders().subscribe(data => this.products = data); // lấy số lượng sản phẩm order món gì - số lượng bn
        this.tbOrderService.getOrderingInfo().subscribe(data => {
            if (data) {
                this._totalPayment = data.totalPayment;
            }
        }); // lấy sô tiền đã đc tính
    }

    onChange(event) {
        this.router.navigate([`/order/order-list/${event}`]);
        location.reload();
    }

    onOrderNow() {
        this.billService.getBillByIdTable(this.selected).subscribe((data: Bill) => {
            if (data.BanID && data.DaThanhToan == false) {
                // tạo chi tiết hóa đơn lưu lên server HoaDonXuatID
                let newBill: Bill = {
                    HoaDonXuatID: data.HoaDonXuatID,
                    BanID: this.selected,
                    DaThanhToan: false,
                    ChiNhanhID: data.ChiNhanhID,
                    HinhThucThanhToan: 'Tiền mặt',
                    TongTien: this._totalPayment,
                    TenKhachHang: this.customerName
                };

                this.billService.updateBill(newBill).subscribe(_ => {
                    // update lại số lượng sản phẩm (sản phẩm đã được order)
                    let subsription = this.tbOrderService.getNewOrder().subscribe(x => {
                        console.log(x);

                        if (x.length > 0) {
                            for (let item of x) {
                                let newBillDetail: any = {
                                    HoaDonXuatID: data.HoaDonXuatID,
                                    SanPhamID: item.SanPhamID,
                                    SoLuong: item.SoLuong
                                }
                                this.CTHDService.createBillDetail(newBillDetail).subscribe();
                            }
                            this.toastr.success('Order thành công', 'Thông báo');
                        } else {
                            for (let item of this.products) {
                                let newBillDetail: any = {
                                    HoaDonXuatID: data.HoaDonXuatID,
                                    SanPhamID: item.SanPhamID,
                                    SoLuong: item.SoLuong
                                }
                                this.CTHDService.updateBilLDetail(newBillDetail).subscribe();
                            }
                            this.toastr.success('Order thành công', 'Thông báo');
                        }
                    })
                    subsription.unsubscribe();
                    this.tbOrderService.onDestroyNewOrders(); // thêm sản phẩm mới thành công -> reset lại mảng newOrders
                }); // update số tiền
            }
        }, (err) => {

            // if (err.status === 404) { // không tồn tại bàn trên hóa đơn xuất => tạo mới hđx theo bàn
            //     //tạo hóa đơn lưu lên server
            //     let newBill: Bill = {
            //         BanID: this.selected,
            //         ChiNhanhID: 1,
            //         DaThanhToan: false,
            //         HinhThucThanhToan: 'Tiền mặt',
            //         NgayGio: new Date(Date.now()),
            //         TongTien: this._totalPayment,
            //         TenKhachHang: this.customerName
            //     };
            //     this.billService.createBill(newBill).subscribe(data => {
            //         // // tạo chi tiết hóa đơn lưu lên server HoaDonXuatID
            //         for (let item of this.products) {
            //             let newBillDetail: CTHD = {
            //                 HoaDonXuatID: data.HoaDonXuatID,
            //                 SanPhamID: item.SanPhamID,
            //                 SoLuong: item.SoLuong
            //             }
            //             this.CTHDService.createBillDetail(newBillDetail).subscribe();
            //         }
            //         this.toastr.success('Order thành công', 'Thông báo');
            //         // this.tbOrderService.destroyTableOrders();
            //     });
            // }
        });
    }
}
