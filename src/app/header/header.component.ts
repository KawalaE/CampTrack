import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  localStorageService = inject(LocalStorageService);
  constructor(private router: Router) {}
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  get emeralds() {
    return this.localStorageService.getEmeralds();
  }
}
