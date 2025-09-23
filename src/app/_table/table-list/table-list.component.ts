import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'src/@core/interfaces/table.interface';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { TablesService } from 'src/@core/services/table/tables.service';
import { BillService } from 'src/@core/services/bills/bill.service';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { CTHD } from 'src/@core/interfaces/billdetail.interface';
import { CTHDService } from 'src/@core/services/bills/CTHD.service';;
import { JwtService } from 'src/@core/services/jwt.service';
import { AuthService } from 'src/@core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NewTableComponent } from '../new-table/new-table.component';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  onLogout() {
    // TODO: Thêm logic đăng xuất nếu cần
  }

  isClicked = true;
  public tables: Table[] = [];
  Bills: Bill[];
  CTHDs: CTHD[];
  getWidth = 0;
  quatity: number;
  constructor(
    private titleService: Title,
    private router: Router,
    private tableService: TablesService,
    private displayTabService: DisplaytabsService,
    private billService: BillService,
    private CTHDService: CTHDService,
    private autheService: AuthService,
    private jwtService: JwtService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.displayTabService.setTabsName('TABLE');
    this.titleService.setTitle('TABLE');
  }

  ngOnInit() {
    this.one();
    this.two();
    this.getTablesOrdered();
    setTimeout(() => {
      this.onResize();
    });
  }

  getTablesOrdered() {
    this.tableService.getTables().subscribe((tables: Table[]) => {
      this.tables = tables;
      this.billService.getBillByStt().subscribe((bills: Bill[]) => {
        this.Bills = bills;
        this.Bills.map(x => {
          this.tables.map(s => {
            if (s.BanID == x.BanID) {
              this.CTHDService.getBillDetailByBillId(x.HoaDonXuatID).subscribe((CTHDTable: CTHD[]) => {
                x.CTHDs = CTHDTable;
                this.quatity = 0;
                x.CTHDs.map(cthd => this.quatity = this.quatity + cthd.SoLuong);
                s.SoLuongOrder = this.quatity;
                s.TenKhachHang = x.TenKhachHang;
              });
            }
          });
        });
      });
    });

  }

  one() {
    this.isClicked = false;
  }

  two() {
    this.isClicked = true;
  }
  order() {
    this.router.navigate(['order']);
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

  NewTable() {
    this.dialog.open(NewTableComponent, {
      minWidth: '500px',
      height: '300px',
      data: +this.activatedRoute.snapshot.params.id // gửi id bàn qua component dialog
    });
  }

  viewOrder(BanID) {
    this.router.navigate(['order/order-list', BanID])
  }

  signOut() {
    this.autheService.isLogin = false;
    this.jwtService.destroyToken();
    this.router.navigate(['auth']);
    this.toastr.success('Đăng xuất thành công');
  }

  Ordered(BanID) {
    this.router.navigate(['order/order-list', BanID])
  }
}
