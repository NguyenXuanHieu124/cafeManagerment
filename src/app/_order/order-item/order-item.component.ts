import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/@core/interfaces/product.interface';
import { TableOrderService } from 'src/@core/services/table/tb-order.service';
import { CategoryService } from 'src/@core/services/products/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() product: Product;
  constructor(
    private tbOrderService: TableOrderService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  onReduction(product: Product) {
    const subscription = this.categoryService.returnReductionOrder().subscribe(data => {
      const index = data.findIndex(x => x.SanPhamId === product.SanPhamID);
      if (index > -1) { // tìm thấy sp này đã được order trên server
        if (product.SoLuong > data[index].SoLuong) { // nếu SL đang order > SL đc order trên server => cho phép giảm số lượng xuống
          this.tbOrderService.reductionTableOrder(product);
        } else {
          this.toastr.error('Không thể giảm. Sản phẩm đã phục vụ!');
        }
      } else { // sp này chưa được order trên server => cho phép tăng giảm tùy ý
        this.tbOrderService.reductionTableOrder(product);
      }
    });
    subscription.unsubscribe();
  }

  onAdd(product: Product) {
    this.tbOrderService.addTableOrders(product);
  }

}
