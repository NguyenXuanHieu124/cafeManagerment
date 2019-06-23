import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/@core/interfaces/product.interface';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() product: Product;
  constructor(private tabsName: DisplaytabsService, private router: Router) { }

  ngOnInit() {
  }
  onDetail(pro) {
    this.router.navigate(['/detail', pro.SanPhamID])
    this.tabsName.setTabsName(pro.TenSP);
  }

}
