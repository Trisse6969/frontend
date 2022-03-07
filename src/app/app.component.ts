import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  user: User|null = null;

  constructor(private router: Router, public authenticationService: AuthenticationService, public inventoryService: InventoryService)
  {
    this.inventoryService.user$.subscribe(x => this.user = x);
  }

  logout(e: Event) {
    e.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
