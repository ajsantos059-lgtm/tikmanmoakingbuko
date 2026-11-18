export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Classics' | 'Specials';
  icon: string;
  color: string;
  image?: string;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderConfirmation {
  name: string;
  fulfillment: 'Pickup' | 'Delivery';
}

export interface ShippingDetails {
  name: string;
  phone: string;
  fulfillment: 'Pickup' | 'Delivery';
  address: {
    street: string;
    barangay: string;
    city: string;
    postalCode: string;
  };
}
