import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/@core/interfaces/table.interface';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { TablesService } from 'src/@core/services/table/tables.service';
import { ToastrService } from 'ngx-toastr';
import { BillService } from 'src/@core/services/bills/bill.service';
import { Bill } from 'src/@core/interfaces/bill.interface';
import { TableOrderService } from 'src/@core/services/table/tb-order.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() table: Table;
  tables: Table[];
  quatity: number;


  constructor(
    private router: Router,
    private displayTabService: DisplaytabsService,
    private tableService: TablesService,
    private toastr: ToastrService,
    private billService: BillService,
    private tbOrderService: TableOrderService
  ) { }

  ngOnInit() {
  }

  order(table: Table) {
    this.displayTabService.setTabsName('Order List');
    this.router.navigate([`order/order-list/${table.BanID}`]);
  }

  sttTable(table) {
    if (table.Status == 2) {
      this.toastr.warning('Bàn đã được phục vụ', 'Thông báo');
    } else {
      const tab: Table = {
        BanID: table.BanID,
        Status: table.Status - 1
      }
      this.tableService.updateTable(tab).subscribe();
      table.Status = tab.Status;
    }
  }

  Accomplished(table) {
    table.Status = 1;
    const tab: Table = {
      TenBan: table.TenBan,
      BanID: table.BanID,
      Status: 1
    }
    this.tableService.updateTable(tab).subscribe();
    this.billService.getBillByIdTable(table.BanID).subscribe(bill => {
      let hd: Bill = {
        HoaDonXuatID: bill.HoaDonXuatID,
        NgayGio: bill.NgayGio,
        HinhThucThanhToan: bill.HinhThucThanhToan,
        TongTien: bill.TongTien,
        DaThanhToan: true,
        ChiNhanhID: bill.ChiNhanhID,
        BanID: bill.BanID,
        TenKhachHang: bill.TenKhachHang,
      }
      this.billService.updateBill(hd).subscribe();
    })
  }
}
