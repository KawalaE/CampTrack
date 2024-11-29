import { Injectable } from '@angular/core';
import { Product } from '../model/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  mockProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description:
        'Noise-canceling, over-ear headphones with Bluetooth connectivity.',
      price: 199.99,
      stock: 50,
    },
    {
      id: 2,
      name: 'Smartphone',
      description:
        'Latest-gen smartphone with a high-resolution display and powerful processor.',
      price: 799.99,
      stock: 30,
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      description:
        'High-performance laptop designed for gaming and heavy workloads.',
      price: 1499.99,
      stock: 20,
    },
    {
      id: 4,
      name: 'Smartwatch',
      description:
        'Water-resistant smartwatch with fitness tracking and call notifications.',
      price: 249.99,
      stock: 75,
    },
    {
      id: 5,
      name: 'Electric Toothbrush',
      description:
        'Rechargeable electric toothbrush with multiple cleaning modes.',
      price: 89.99,
      stock: 100,
    },
  ];

  constructor() {}
}
