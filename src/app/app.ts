import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddToCartModal } from './add-to-cart-modal';
import { CartPanel } from './cart-panel';
import { OrderStore } from './order.store';
import { OrderConfirmation, Product, ShippingDetails } from './product.model';
import { ShippingDetailsModal } from './shipping-details-modal';
import { SiteHeader } from './site-header';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, RouterOutlet, CartPanel, AddToCartModal, ShippingDetailsModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly orderStore = inject(OrderStore);
  cartOpen = false;
  shippingFormOpen = false;
  orderConfirmation: OrderConfirmation | null = null;

  openCart(): void {
    this.cartOpen = true;
  }

  saveShippingDetails(details: ShippingDetails): void {
    this.orderStore.setShippingDetails(details);
    this.shippingFormOpen = false;
    this.cartOpen = true;
  }

  editShippingDetails(): void {
    this.cartOpen = false;
    this.shippingFormOpen = true;
  }

  completeOrder(order: OrderConfirmation): void {
    this.orderConfirmation = order;
    this.orderStore.clearCart();
    this.cartOpen = false;
  }

  confirmAddToCart(order: { product: Product; quantity: number; shippingDetails: ShippingDetails }): void {
    this.orderStore.setShippingDetails(order.shippingDetails);
    this.orderStore.addToCart(order.product, order.quantity);
  }
}
