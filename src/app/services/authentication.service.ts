import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { InventoryService } from './inventory.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public inventoryService: InventoryService, private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {username, password})
      .pipe(
        map(user => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.inventoryService.user = user;
          return user
        })
      );
  }

  logout() {
    sessionStorage.removeItem('user');
    this.inventoryService.user = null;
  }
}
