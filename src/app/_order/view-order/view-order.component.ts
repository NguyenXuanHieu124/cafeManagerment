import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TablesInfoService } from 'src/@core/services/table/tables-info.service';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableOrderService } from 'src/@core/services/table/tb-order.service';
import { Product } from 'src/@core/interfaces/product.interface';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { BillService } from 'src/@core/services/bills/bill.service';
import { CTHDService } from 'src/@core/services/bills/CTHD.service';
import { ToastrService } from 'ngx-toastr';
import { CTHD } from 'src/@core/interfaces/billdetail.interface';
import { TablesService } from 'src/@core/services/table/tables.service';
import { Table } from 'src/@core/interfaces/table.interface';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit, OnDestroy {

  customerName = '';
  newProductOrder: Product[] = [];
  _orderingInfo: any;
  public products: Product[];
  checkOrder = true; // kiểm tra đã bấm order hay chưa ?
  constructor(
    private title: Title,
    private tableinforService: TablesInfoService, private tbOrderSerivce: TableOrderService, private tableService: TablesService,
    private activatedRoute: ActivatedRoute, private toastr: ToastrService,
    private tbOrderService: TableOrderService,
    private billService: BillService, private CTHDService: CTHDService, private router: Router

  ) { }

  ngOnInit() {
    this.title.setTitle('VIEW ORDER');
    this.tableinforService.setTableId(+this.activatedRoute.snapshot.params.id); // quay vể order-list của bàn hiện tại
    this.tableinforService.getCustomerName().subscribe(customer => this.customerName = customer);
    this.onOrdered();
  }

  onOrdered() {
    let subscription = this.tbOrderService.getTableOrders().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
    subscription.unsubscribe();
    this.tbOrderSerivce.getOrderingInfo().subscribe(data => {
      this._orderingInfo = data;
    }); // ds tất cả sp, nếu có sp số lượng > 0 thì thêm vào stream
    this.tbOrderService.getNewOrder().subscribe(x => this.newProductOrder = x);
  }

  onViewOrderOrderNow() {
    const tableID = +this.activatedRoute.snapshot.params.id;
    // lấy hóa đơn theo id bàn
    this.billService.getBillByIdTable(tableID).subscribe((data: Bill) => {
      if (data.BanID && data.DaThanhToan == false) {
        // update chi tiết hóa đơn lưu lên server HoaDonXuatID
        let newBill: any = {
          HoaDonXuatID: data.HoaDonXuatID,
          BanID: tableID,
          DaThanhToan: false,
          ChiNhanhID: data.ChiNhanhID,
          HinhThucThanhToan: 'Tiền mặt',
          TongTien: this._orderingInfo.totalPayment,
          TenKhachHang: data.TenKhachHang
        };
        this.billService.updateBill(newBill).subscribe(() => {
          // update lại số lượng sản phẩm (sản phẩm đã được order)
          if (this.newProductOrder.length > 0) {
            console.log(this.newProductOrder);
            for (let itemX of this.newProductOrder) {
              let newBillDetail: any = {
                HoaDonXuatID: data.HoaDonXuatID,
                SanPhamID: itemX.SanPhamID,
                SoLuong: itemX.SoLuong
              }
              this.CTHDService.createBillDetail(newBillDetail).subscribe();
            }
          } else {
            for (let itemOrder of this.products) {
              let newBillDetail: any = {
                HoaDonXuatID: data.HoaDonXuatID,
                SanPhamID: itemOrder.SanPhamID,
                SoLuong: itemOrder.SoLuong
              }
              this.CTHDService.updateBilLDetail(newBillDetail).subscribe();
            }
          }
          this.toastr.success('Order thành công', 'Thông báo');
          this.tbOrderService.onDestroyNewOrders(); // thêm sản phẩm mới thành công -> reset lại mảng newOrders
        }); // update số tiền
      }
    }, (err) => {
      // không tồn tại bàn trên hóa đơn xuất => tạo mới hđx theo bàn
      //tạo hóa đơn lưu lên server
      let newBill: Bill = {
        BanID: tableID,
        ChiNhanhID: 1,
        DaThanhToan: false,
        HinhThucThanhToan: 'Tiền mặt',
        NgayGio: new Date(Date.now()),
        TongTien: this._orderingInfo.totalPayment,
        TenKhachHang: this.customerName
      };
      this.billService.createBill(newBill).subscribe(data => {
        // tạo chi tiết hóa đơn lưu lên server HoaDonXuatID
        for (let itemOrder of this.products) {
          let newBillDetail: CTHD = {
            HoaDonXuatID: data.HoaDonXuatID,
            SanPhamID: itemOrder.SanPhamID,
            SoLuong: itemOrder.SoLuong,
          }
          this.CTHDService.createBillDetail(newBillDetail).subscribe();
        }
        const table: Table = {
          BanID: tableID,
          Status: 4
        }
        this.tableService.updateTable(table).subscribe(); // update trạng thái của bàn
      });
      this.toastr.success('Order thành công', 'Thông báo');
      this.tbOrderService.destroyTableOrders();
      this.tbOrderService.onDestroyNewOrders(); // thêm sản phẩm mới thành công -> reset lại mảng newOrders
      });
    this.checkOrder = false; // click order rồi ko đc bấm tiếp nữa
  }
  ngOnDestroy() {
    console.clear();
  }
}
