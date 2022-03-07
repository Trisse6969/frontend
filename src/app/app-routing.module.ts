import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './components/admin/products/products.component';
import { ProductDetailComponent } from './components/admin/product-detail/product-detail.component';
import { ProductAddComponent } from './components/admin/product-add/product-add.component';
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/add', component: ProductAddComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
