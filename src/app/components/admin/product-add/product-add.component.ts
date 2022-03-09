import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(0.0)
  });

  product = {id: 0, name: '', price: 0.0, category: '', description: ''};

  constructor(private route: ActivatedRoute, private productService: ProductService, private location: Location) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    this.productService.addProduct(this.product)
      .subscribe(product => this.product = product);
  }
  
  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.product = this.productForm.value;
    this.addProduct()
  }
}
