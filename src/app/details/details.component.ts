import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/@core/interfaces/product.interface';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { ProductService } from 'src/@core/services/products/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product: Product;
  constructor(
    private title: Title,
    private displayTabsService: DisplaytabsService,
    private activatedSerive: ActivatedRoute,
    private productService: ProductService
  ) {
    this.title.setTitle('DETAIL');
  }

  ngOnInit() {
    this.displayTabsService.getTabsName().subscribe();
    this.productService.getProduct(+this.activatedSerive.snapshot.params.id).subscribe(
      (data: Product) => this.product = data,
      err => {
      console.log(err);
    });
  }

}
