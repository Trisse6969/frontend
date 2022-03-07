import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Product } from '../models/product';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly _products = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products.asObservable();

  get products(): Product[] {
    return this._products.getValue();
  }

  set products(val: Product[]) {
    this._products.next(val);
  }

  private readonly _user = new BehaviorSubject<User|null>((sessionStorage.getItem('user')===null) ? null : JSON.parse(sessionStorage.getItem('user') ?? ""));
  readonly user$ = this._user.asObservable();

  get user(): User|null {
    return this._user.getValue();
  }

  set user(val: User|null) {
    this._user.next(val);
  }

  constructor() { }
}
