import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderingListComponent } from './ordering-list/ordering-list.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderPrepareComponent } from './order-prepare/order-prepare.component';

const routes: Routes = [
  // { path: '', redirectTo: 'order-list', component: OrderingListComponent },
  { path: 'order-prepare', component: OrderPrepareComponent },
  { path: 'order-list/:id', component: OrderingListComponent },
  { path: 'view-order/:id', component: ViewOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
