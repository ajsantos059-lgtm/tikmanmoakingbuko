import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product, ShippingDetails } from './product.model';

@Injectable({ providedIn: 'root' })
export class OrderStore {
  readonly products: Product[] = [
    { id: 'classic', name: 'Classic Buko', description: 'Fresh buko water, straight from the shell.', price: 35, category: 'Classics', icon: '🥥', color: '#edf2dd', tag: 'Bestseller' },
    { id: 'pandan', name: 'Pandan Buko', description: 'A fragrant pandan twist on a local favorite.', price: 45, category: 'Classics', icon: '🍃', color: '#e8efda', image: '/pandan-buko.png' },
    { id: 'melon', name: 'Buko Melon', description: 'Sweet melon meets cool, fresh coconut.', price: 50, category: 'Classics', icon: '🍈', color: '#f5edd5', image: '/buko-melon.png' },
    { id: 'coco-jelly', name: 'Coco Jelly', description: 'Chilled buko juice with chewy nata de coco.', price: 50, category: 'Specials', icon: '🧋', color: '#eee8d7', image: '/coco-jelly.png', tag: 'Crowd fave' },
    { id: 'mango', name: 'Mango Coco', description: 'Sunny mango and creamy young coconut.', price: 60, category: 'Specials', icon: '🥭', color: '#f6e8cd', image: '/mango-coco.png', tag: 'Tropical' },
    { id: 'coco-cream', name: 'Coco Cream', description: 'A silky, creamy treat with real buko strips.', price: 65, category: 'Specials', icon: '🥛', color: '#eeeade', image: '/coco-cream.png' },
  ];

  readonly cartItems = signal<CartItem[]>([]);
  readonly pendingProduct = signal<Product | null>(null);
  readonly shippingDetails = signal<ShippingDetails | null>(null);
  readonly itemCount = computed(() => this.cartItems().reduce((count, item) => count + item.quantity, 0));

  getProduct(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  openAddModal(product: Product): void {
    this.pendingProduct.set(product);
  }

  closeAddModal(): void {
    this.pendingProduct.set(null);
  }

  setShippingDetails(details: ShippingDetails): void {
    this.shippingDetails.set(details);
  }

  addToCart(product: Product, quantity: number): void {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) => item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item);
      }

      return [...items, { product, quantity }];
    });
    this.closeAddModal();
  }

  changeQuantity(productId: string, delta: number): void {
    this.cartItems.update((items) => items
      .map((item) => item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  }

  removeFromCart(productId: string): void {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.shippingDetails.set(null);
  }
}
