import { Routes } from '@angular/router';
import { HomePage } from './home-page';
import { ProductDetail } from './product-detail';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Buko Sarap — Fresh Coconut Drinks' },
  { path: 'product/:id', component: ProductDetail, title: 'Drink Details — Buko Sarap' },
  { path: '**', redirectTo: '' },
];
