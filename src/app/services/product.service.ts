import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Product } from '../models/product';
import { ProductPayload } from '../models/productPayload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl = `${environment.apiUrl}/products`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProducts(): Observable<ProductPayload> {
    return this.http.get<ProductPayload>(this.productsUrl)
      .pipe(catchError(this.handleError<ProductPayload>('getProducts', { products: [], count: 0})))
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(catchError(this.handleError<Product>(`getProduct/${id}`)));
  }

  saveProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`
    return this.http.put<Product>(url, product, this.httpOptions)
      .pipe(
        catchError(this.handleError('saveProduct', product))
      );
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`
    return this.http.delete<Product>(url)
      .pipe(
        catchError(this.handleError<Product>('deleteProduct'))
      );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('addProduct', product))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  constructor(private http: HttpClient) { }
}
