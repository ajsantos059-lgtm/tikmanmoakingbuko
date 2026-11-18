import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderStore } from './order.store';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  readonly orderStore = inject(OrderStore);

  get product() {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? this.orderStore.getProduct(id) : undefined;
  }
}
