import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(0.0)
  });
  product = {id: 0, name: '', price: 0.0, category: '', description: ''};

  constructor(private route: ActivatedRoute, private productService: ProductService, private location: Location) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
    console.log(this.product);
  }

  saveProduct(): void {
    this.productService.saveProduct(this.product)
      .subscribe(product => this.product = product);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.product = this.productForm.value;
    this.saveProduct();
  }
}
