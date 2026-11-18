import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, OrderConfirmation, ShippingDetails } from './product.model';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  templateUrl: './cart-panel.html',
  styleUrl: './cart-panel.css',
})
export class CartPanel {
  @Input() items: CartItem[] = [];
  @Input() shippingDetails: ShippingDetails | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() quantityChange = new EventEmitter<{ productId: string; delta: number }>();
  @Output() removeItem = new EventEmitter<string>();
  @Output() editShipping = new EventEmitter<void>();
  @Output() orderSubmitted = new EventEmitter<OrderConfirmation>();

  get fulfillment(): 'Pickup' | 'Delivery' {
    return this.shippingDetails?.fulfillment ?? 'Pickup';
  }

  get subtotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get deliveryFee(): number {
    return this.fulfillment === 'Delivery' && this.items.length > 0 ? 49 : 0;
  }

  get total(): number {
    return this.subtotal + this.deliveryFee;
  }

  submitOrder(): void {
    if (!this.shippingDetails || this.items.length === 0) {
      return;
    }

    this.orderSubmitted.emit({
      name: this.shippingDetails.name,
      fulfillment: this.shippingDetails.fulfillment,
    });
  }
}
