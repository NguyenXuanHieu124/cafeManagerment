import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesService } from 'src/@core/services/table/tables.service';
import { Table } from 'src/@core/interfaces/table.interface';
import { BillService } from 'src/@core/services/bills/bill.service';
import { Bill } from 'src/@core/interfaces/bill.interface';

@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss']
})
export class NewTableComponent implements OnInit {

  tables: Table[];
  constructor(
    private router: Router,
    private tableService: TablesService, private billService: BillService
  ) { }

  ngOnInit() {
    this.tableService.getTablesOrder(1).subscribe((data: Table[]) => {
      this.tables = data
    });

  }

  onChange(event) {
    // tạo bàn -> tạo 1 bill mới và cập nhật lại trạng thái của bàn
    const newBill: Bill = {
      BanID: event,
      ChiNhanhID: 1,
      DaThanhToan: false,
      HinhThucThanhToan: 'Tiền mặt',
      NgayGio: new Date(Date.now()),
      TongTien: 0,
      TenKhachHang: ''
    };
    this.billService.createBill(newBill).subscribe(); // tạo 1 bill mới
    const table: Table = {
      BanID: event,
      Status: 4
    }
    this.tableService.updateTable(table).subscribe(); // update trạng thái của bàn
    this.router.navigate([`/order/order-list/${event}`]);
    // location.reload();
  }
}
