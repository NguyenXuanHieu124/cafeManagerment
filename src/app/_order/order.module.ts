import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderingListComponent } from './ordering-list/ordering-list.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderPrepareComponent } from './order-prepare/order-prepare.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderCartDialogComponent } from './order-dialog/order-cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrderingListComponent,
    ViewOrderComponent,
    OrderPrepareComponent,
    OrderItemComponent,
    OrderCartDialogComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents:[OrderCartDialogComponent]
})
export class OrderModule { }
