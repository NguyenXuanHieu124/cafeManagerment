import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ValueClass } from 'src/@core/interfaces/valueclass.interface';
import { Product } from 'src/@core/interfaces/product.interface';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { ProductService } from 'src/@core/services/products/product.service';
import { CategoryService } from 'src/@core/services/products/category.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  valueClass: ValueClass;
  products: Product[];
  constructor(private title: Title,
    private router: Router,
    private displayTabService: DisplaytabsService,
    private productService: ProductService,
    private categoryService: CategoryService

  ) { this.displayTabsName()}

  ngOnInit() {
    this.onCoffee();
  }

  onCoffee() {
    this.categoryService.getProductByCategoryMenu(1).subscribe((data: Product[]) => this.products = data);
    this.productService.onCoffee().subscribe(data => this.valueClass = data);
  }
  onTea() {
    this.categoryService.getProductByCategoryMenu(2).subscribe((data: Product[]) => this.products = data);
    this.productService.onTea().subscribe(data => this.valueClass = data);
  }
  onSpecial() {
    this.categoryService.getProductByCategoryMenu(3).subscribe((data: Product[]) => this.products = data);
    this.productService.onSpecial().subscribe(data => this.valueClass = data);
  }
  onDessert() {
    this.categoryService.getProductByCategoryMenu(4).subscribe((data: Product[]) => this.products = data);
    this.productService.onDessert().subscribe(data => this.valueClass = data);
  }
  displayTabsName() {
    this.title.setTitle('MENU');
    this.displayTabService.setTabsName('MENU');
  }

}
