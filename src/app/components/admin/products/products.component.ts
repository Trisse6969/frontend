import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../services/product.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];

  constructor(private productService: ProductService, public inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {this.inventoryService.products = products});
  }

}
