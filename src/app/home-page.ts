import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuSection } from './menu-section';
import { OrderStore } from './order.store';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MenuSection, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  readonly orderStore = inject(OrderStore);
}
