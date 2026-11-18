import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ShippingDetails } from './product.model';

@Component({
  selector: 'app-shipping-details-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shipping-details-modal.html',
  styleUrl: './shipping-details-modal.css',
})
export class ShippingDetailsModal implements OnInit {
  @Input() initialDetails: ShippingDetails | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() continueToCart = new EventEmitter<ShippingDetails>();

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

  submit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.continueToCart.emit({
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
    });
  }
}
