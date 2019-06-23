import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ValueClass } from 'src/@core/interfaces/valueclass.interface';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { ProductService } from 'src/@core/services/products/product.service';
import { Product } from 'src/@core/interfaces/product.interface';
import { CategoryService } from 'src/@core/services/products/category.service';
import { MatDialog } from '@angular/material';
import { OrderCartDialogComponent } from '../order-dialog/order-cart.component';
import { TableOrderService } from 'src/@core/services/table/tb-order.service';
import { TablesService } from 'src/@core/services/table/tables.service';
import { BillService } from 'src/@core/services/bills/bill.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/@core/auth/auth.service';
import { JwtService } from 'src/@core/services/jwt.service';
import { Subscription } from 'rxjs';
import { TablesInfoService } from 'src/@core/services/table/tables-info.service';

@Component({
  selector: 'app-ordering-list',
  templateUrl: './ordering-list.component.html',
  styleUrls: ['./ordering-list.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '370px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class OrderingListComponent implements OnInit {

  isOpenOrder = true;
  valueClass: ValueClass;
  tableName = '';
  products: Product[] = [];
  productOrders: Product[];
  _orderingInfo: any;
  getWidth = 0;
  customerName = '';
  constructor(
    private title: Title, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private displayTabService: DisplaytabsService,
    private productService: ProductService, private router: Router, private categoryService: CategoryService, private tbOrderSerivce: TableOrderService,
    private tableService: TablesService, private billService: BillService, private toastr: ToastrService, private tbInfoService: TablesInfoService,
    private autheService: AuthService, private jwtService: JwtService,
  ) { // hiển thị tab name
    this.title.setTitle('ORDER LIST');
    this.displayTabService.setTabsName('ORDER LIST');
  }

  ngOnInit() {
    this.displayTabsName();
    this.onCoffee();
    this.onOrderingInfo();
    setTimeout(() => {
      this.onResize();
    }, 0);
  }

  onResize() {
    // lấy kích thước màn hình để ẩn hiện header
    this.getWidth = window.innerWidth;
    if (this.getWidth > 991) {
      this.displayTabService.setToDisplay(true);
    } else {
      this.displayTabService.setToDisplay(false);
    }
  }
  // dialog
  onOrderCart() {
    this.dialog.open(OrderCartDialogComponent, {
      minWidth: '660px',
      height: '5100px',
      data: +this.activatedRoute.snapshot.params.id // gửi id bàn qua component dialog
    });
  }

  onOrderingInfo() {
    const params = +this.activatedRoute.snapshot.params.id; // id của bàn
    this.categoryService.destroyReductionOrder();
    this.categoryService.getProductOrdered(params).subscribe((data: Product[]) => {
      this.tbOrderSerivce.destroyTableOrders(); // sản phẩm order + số lượng-giá tiền reset về 0
      for (let item of data) {
        if (item.SoLuong > 0) {
          this.tbOrderSerivce.addTableOrders(item);
        }
      }
      this.billService.getBillByIdTable(params).subscribe(data => {
        if (data) {
          this.customerName = data.TenKhachHang
        }
      }, (err) => {
        if (err.status === 404) {
          this.customerName = '';
        }
      });
    });
    this.tbOrderSerivce.getOrderingInfo().subscribe(data => {
      this._orderingInfo = data;
    }); // ds tất cả sp, nếu có sp số lượng > 0 thì thêm vào stream
  }

  // load danh mục sp + SL order
  onSubscribeAddOrder() {
    this.tbOrderSerivce.getTableOrders().subscribe(data => {
      if (!this.products || !data) { return; }
      this.products = this.products.map(x => {
        const found = data.find(d => d.SanPhamID === x.SanPhamID);
        if (found) { x.SoLuong = found.SoLuong; }
        return x;
      });
    });
  }


  onCoffee() {
    const params = +this.activatedRoute.snapshot.params.id;
    this.categoryService.getByCategory(1, params).subscribe((data: Product[]) => {
      this.products = data;
    });
    setTimeout(() => {
      this.onSubscribeAddOrder();
    }, 100);
    this.productService.onCoffee().subscribe(data => this.valueClass = data);
  }
  onTea() {
    const params = +this.activatedRoute.snapshot.params.id;
    this.categoryService.getByCategory(2, params).subscribe((data: Product[]) => {
      this.products = data;
    });
    setTimeout(() => {
      this.onSubscribeAddOrder();
    }, 100);
    this.productService.onTea().subscribe(data => this.valueClass = data);
  }
  onSpecial() {
    const params = +this.activatedRoute.snapshot.params.id;
    this.categoryService.getByCategory(3, params).subscribe((data: Product[]) => {
      this.products = data;
    });
    setTimeout(() => {
      this.onSubscribeAddOrder();
    }, 100);
    this.productService.onSpecial().subscribe(data => this.valueClass = data);
  }
  onDessert() {
    const params = +this.activatedRoute.snapshot.params.id;
    this.categoryService.getByCategory(4, params).subscribe((data: Product[]) => {
      this.products = data;
    });
    setTimeout(() => {
      this.onSubscribeAddOrder();
    }, 100);
    this.productService.onDessert().subscribe(data => this.valueClass = data);
  }

  orderNow() {
    const tableID = +this.activatedRoute.snapshot.params.id;
    if (!this.customerName) {
      this.toastr.error('Tên khách hàng chưa được nhập !');
    } else {
      this.tbInfoService.setCustomerName(this.customerName);
      this.router.navigate(['/order/view-order', tableID]);
      this.displayTabService.setTabsName(this.tableName);
    }
  }

  displayTabsName() {
    const tableID = +this.activatedRoute.snapshot.params.id;
    this.tableService.getTableById(tableID).subscribe(data => {
      this.tableName = data.TenBan;
      if (data) {
        this.customerName = data.TenKhachHang
      }
    }, err => {
      if (err.status === 404) {
        this.customerName = '';
      }
    });
  }

  // danh sách sp order => mobile ***
  toggleOpen() {
    this.isOpenOrder = false;
    this.tbOrderSerivce.getTableOrders().subscribe(data => this.productOrders = data);
  }

  toggleClose() {
    this.isOpenOrder = true;
  }

  signOut() {
    this.autheService.isLogin = false;
    this.jwtService.destroyToken();
    this.router.navigate(['auth']);
    this.toastr.success('Đăng xuất thành công');
  }

}
