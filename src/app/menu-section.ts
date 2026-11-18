import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from './product.model';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './menu-section.html',
  styleUrl: './menu-section.css',
})
export class MenuSection {
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<Product>();

  searchTerm = '';
  activeCategory = 'All drinks';
  readonly categories = ['All drinks', 'Classics', 'Specials'];

  get filteredProducts(): Product[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesCategory = this.activeCategory === 'All drinks' || product.category === this.activeCategory;
      const matchesSearch = !query || `${product.name} ${product.description}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }
}
