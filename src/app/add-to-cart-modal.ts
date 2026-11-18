import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product, ShippingDetails } from './product.model';

@Component({
  selector: 'app-add-to-cart-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-to-cart-modal.html',
  styleUrl: './add-to-cart-modal.css',
})
export class AddToCartModal implements OnInit {
  @Input({ required: true }) product!: Product;
  @Input() initialDetails: ShippingDetails | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirmAdd = new EventEmitter<{ product: Product; quantity: number; shippingDetails: ShippingDetails }>();

  quantity = 1;
  name = '';
  phone = '';
  fulfillment: 'Pickup' | 'Delivery' = 'Delivery';
  street = '';
  barangay = '';
  city = '';
  postalCode = '';

  ngOnInit(): void {
    if (!this.initialDetails) {
      return;
    }

    this.name = this.initialDetails.name;
    this.phone = this.initialDetails.phone;
    this.fulfillment = this.initialDetails.fulfillment;
    this.street = this.initialDetails.address.street;
    this.barangay = this.initialDetails.address.barangay;
    this.city = this.initialDetails.address.city;
    this.postalCode = this.initialDetails.address.postalCode;
  }

  get lineTotal(): number {
    return this.product.price * this.quantity;
  }

  submit(form: NgForm): void {
    if (form.invalid || this.quantity < 1 || this.quantity > 20) {
      form.control.markAllAsTouched();
      return;
    }

    const shippingDetails: ShippingDetails = {
      name: this.name.trim(),
      phone: this.phone.trim(),
      fulfillment: this.fulfillment,
      address: this.fulfillment === 'Delivery'
        ? {
            street: this.street.trim(),
            barangay: this.barangay.trim(),
            city: this.city.trim(),
            postalCode: this.postalCode.trim(),
          }
        : { street: '', barangay: '', city: '', postalCode: '' },
    };

    this.confirmAdd.emit({ product: this.product, quantity: this.quantity, shippingDetails });
    this.quantity = 1;
  }
}
